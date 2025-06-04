import { useQuery } from "@tanstack/react-query";
import { getUserRepos } from "@/services";
import { GitHubRepository } from "@/types";

/**
 * Hook to fetch repositories for a GitHub user
 * @param {string} username - GitHub username
 * @returns {UseQueryResult<GitHubRepository[]>} - Query result containing repositories data
 * @example
 * const { data, isLoading, error } = useUserRepos('octocat');
 */
export function useUserRepos(username: string) {
  return useQuery<GitHubRepository[]>({
    queryKey: ["userRepos", username],
    queryFn: () => getUserRepos(username),
    enabled: !!username,
  });
}
