import { useQuery } from "@tanstack/react-query";
import { getUsers } from "@/services";
import { GitHubUserSearchResult } from "@/types";

/**
 * Hook to search GitHub users
 * @param {string} query - Search query
 * @param {number} [per_page] - Number of results per page
 * @returns {UseQueryResult<GitHubUserSearchResult>} - Query result containing users data
 * @example
 * const { data, isLoading, error } = useUsers('octocat', 5);
 */
export function useUsers(query: string, per_page?: number) {
  return useQuery<GitHubUserSearchResult>({
    queryKey: ["users", query, per_page],
    queryFn: () => getUsers(query, per_page),
    enabled: !!query,
  });
}
