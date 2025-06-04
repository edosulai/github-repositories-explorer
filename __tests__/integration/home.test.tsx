import { server } from "@/__mocks__/server";
import Home from "@/app/page";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import "@testing-library/jest-dom";
import {
  act,
  fireEvent,
  render,
  screen,
  waitFor,
} from "@testing-library/react";
import { mockAnimationsApi } from "jsdom-testing-mocks"; 

mockAnimationsApi();

jest.mock("@/components/molecules/repo-modal.molecules", () => ({
  RepoModal: () => <div data-testid="mocked-repo-modal">Mocked Modal</div>,
}));

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: false,
    },
  },
});

const renderWithClient = (ui: React.ReactElement) => {
  return render(
    <QueryClientProvider client={queryClient}>{ui}</QueryClientProvider>
  );
};

describe("Home Page", () => {

  beforeAll(() => server.listen());

  afterEach(() => {
    server.resetHandlers();
    queryClient.clear();
  });

  afterAll(() => server.close());

  it("renders search input", async () => {
    renderWithClient(<Home />);
    const input = await screen.findByPlaceholderText("Search by name");
    expect(input).toBeInTheDocument();
  });

  it("displays results when searching for octocat", async () => {
    renderWithClient(<Home />);
    const input = screen.getByPlaceholderText("Search by name");

    await act(async () => {
      fireEvent.change(input, { target: { value: "octocat" } });
    });


    const octocatResult = await screen.findByText("octocat");
    expect(octocatResult).toBeInTheDocument();
  });

  it("handles user search and displays repositories", async () => {
    renderWithClient(<Home />);

    expect(screen.getByText("Type Something ...")).toBeInTheDocument();

    const searchInput = screen.getByPlaceholderText("Search by name");
    await act(async () => {
      fireEvent.change(searchInput, { target: { value: "octocat" } });
    });

    const octocatResult = await waitFor(
      () => screen.findByText("octocat")
    );
    expect(octocatResult).toBeInTheDocument();

    await act(async () => {
      fireEvent.click(octocatResult);
    });

    const helloWorldRepo = await waitFor(
      () => screen.findByText("Hello-World")
    );
    expect(helloWorldRepo).toBeInTheDocument();
  });
});
