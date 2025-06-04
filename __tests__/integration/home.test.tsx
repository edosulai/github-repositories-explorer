import { server } from "@/__mocks__/server";
import Home from "@/app/page";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import "@testing-library/jest-dom";
import { act, fireEvent, render, screen } from "@testing-library/react";
import { mockAnimationsApi } from "jsdom-testing-mocks";

mockAnimationsApi();

// Mock RepoModal
jest.mock("@/components/molecules/repo-modal.molecules", () => ({
  RepoModal: () => <div data-testid="mocked-repo-modal">Mocked Modal</div>,
}));

// Mock Router & Search Params
const mockPush = jest.fn();
const mockSearchParams = new URLSearchParams(); // global mock

jest.mock("next/navigation", () => ({
  useRouter() {
    return {
      route: "/",
      pathname: "",
      query: {},
      asPath: "",
      push: mockPush,
      events: {
        on: jest.fn(),
        off: jest.fn(),
      },
      beforePopState: jest.fn(),
      prefetch: jest.fn(),
    };
  },
  useSearchParams() {
    return mockSearchParams;
  },
}));

const queryClient = new QueryClient({
  defaultOptions: {
    queries: { retry: false },
  },
});

const renderWithClient = (ui: React.ReactElement) => {
  return render(
    <QueryClientProvider client={queryClient}>{ui}</QueryClientProvider>
  );
};

describe("Home Page Integration", () => {
  beforeAll(() => server.listen());

  afterEach(() => {
    server.resetHandlers();
    queryClient.clear();
    mockSearchParams.set("q", ""); // reset after each test
    mockPush.mockClear();
  });

  afterAll(() => server.close());

  it("renders search input", async () => {
    renderWithClient(<Home />);
    const input = await screen.findByPlaceholderText(
      "Search by name",
      {},
      { timeout: 3000 }
    );
    expect(input).toBeInTheDocument();
  });

  it("displays results when searching for octocat", async () => {
    renderWithClient(<Home />);
    const input = await screen.findByPlaceholderText("Search by name");

    await act(async () => {
      fireEvent.change(input, { target: { value: "octocat" } });
    });

    const octocatResult = await screen.findByText(
      "octocat",
      {},
      { timeout: 5000 }
    );
    expect(octocatResult).toBeInTheDocument();
  });

  it("handles user search and displays repositories", async () => {
    renderWithClient(<Home />);

    expect(
      await screen.findByText("Type Something ...", {}, { timeout: 3000 })
    ).toBeInTheDocument();

    const input = await screen.findByPlaceholderText("Search by name");

    await act(async () => {
      fireEvent.change(input, { target: { value: "octocat" } });
    });

    const octocatResult = await screen.findByText(
      "octocat",
      {},
      { timeout: 5000 }
    );
    expect(octocatResult).toBeInTheDocument();

    await act(async () => {
      fireEvent.click(octocatResult);
    });

    const helloWorldRepo = await screen.findByText(
      "Hello-World",
      {},
      { timeout: 5000 }
    );
    expect(helloWorldRepo).toBeInTheDocument();
  });
});
