import { useQuery } from "@tanstack/react-query";
import { getRepoReadme } from "@/services";

/**
 * Hook to fetch README content for a GitHub repository
 * @param {string} username - GitHub username
 * @param {string} [repoName] - Repository name
 * @returns {UseQueryResult<string>} - Query result containing README content
 * @example
 * const { data, isLoading, error } = useRepoReadme('octocat', 'Hello-World');
 */
export function useRepoReadme(username: string, repoName: string | undefined) {
  return useQuery({
    queryKey: ["repoReadme", repoName],
    queryFn: () => getRepoReadme(username, repoName!),
    enabled: !!repoName,
  });
}
