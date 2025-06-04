import * as githubServices from "@/services";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { renderHook, waitFor } from "@testing-library/react";
import { useUsers } from "./useUsers";

jest.mock("@/services", () => {
  const originalModule = jest.requireActual("@/services");
  return {
    ...originalModule,
    getUsers: jest.fn(),
  };
});

describe("useUsers", () => {
  const queryClient = new QueryClient({
    defaultOptions: {
      queries: {
        retry: false,
      },
    },
  });

  const wrapper = ({ children }: { children: React.ReactNode }) =>
    QueryClientProvider({
      client: queryClient,
      children,
    });

  beforeEach(() => {
    queryClient.clear();
    jest.clearAllMocks();
  });

  it("fetches users data when query is provided", async () => {
    const mockData = {
      items: [
        {
          login: "octocat",
          id: 583231,
          avatar_url: "https://avatars.githubusercontent.com/u/583231?v=4",
          type: "User",
          score: 1.0,
        },
      ],
      total_count: 1,
    };

    (githubServices.getUsers as jest.Mock).mockResolvedValueOnce(mockData);

    const { result } = renderHook(() => useUsers("octocat"), { wrapper });

    expect(result.current.isLoading).toBe(true);
    expect(result.current.data).toBeUndefined();

    await waitFor(() => {
      expect(result.current.isLoading).toBe(false);
    });

    expect(result.current.data).toEqual(mockData);
    expect(githubServices.getUsers).toHaveBeenCalledWith("octocat");
  });
});
