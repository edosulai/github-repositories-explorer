import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import "@testing-library/jest-dom";
import { act, fireEvent, render, screen } from "@testing-library/react";
import Home from "@/app/page";

jest.mock("@/hooks/useUsers", () => ({
  useUsers: jest.fn(() => ({
    data: null,
    error: null,
    isLoading: false,
  })),
}));

jest.mock("@/hooks/useRepoReadme", () => ({
  useRepoReadme: jest.fn(() => ({
    data: null,
    error: null,
    isLoading: false,
  })),
}));

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
  beforeEach(() => {
    queryClient.clear();
    jest.clearAllMocks();
  });

  it("renders search input", async () => {
    renderWithClient(<Home />);
    const input = await screen.findByPlaceholderText("Search by name");
    expect(input).toBeInTheDocument();
  });

  it("shows loading state when searching", async () => {
    // eslint-disable-next-line @typescript-eslint/no-require-imports
    const { useUsers } = require("@/hooks/useUsers");
    useUsers.mockImplementation(() => ({
      data: null,
      error: null,
      isLoading: true,
    }));

    renderWithClient(<Home />);
    const input = screen.getByPlaceholderText("Search by name");
    await act(async () => {
      fireEvent.change(input, { target: { value: "test" } });
    });

    expect(screen.getByTestId("loading-indicator")).toBeInTheDocument();
  });

  it("displays 'Type Something ...' when no search query", async () => {
    await act(async () => {
      renderWithClient(<Home />);
    });
    expect(screen.getByText("Type Something ...")).toBeInTheDocument();
  });

  it("has proper dark mode styles", async () => {
    await act(async () => {
      renderWithClient(<Home />);
    });
    const main = screen.getByRole("main");
    expect(main).toHaveClass("dark:bg-[#111827b3]", "dark:text-white/70");
  });

  it("renders search input with proper styling", async () => {
    renderWithClient(<Home />);
    const input = await screen.findByPlaceholderText("Search by name");
    expect(input).toHaveClass(
      "w-full",
      "p-4",
      "mb-4",
      "border",
      "border-gray-300",
      "rounded-3xl",
      "dark:bg-gray-800",
      "dark:border-gray-700"
    );
  });
});
