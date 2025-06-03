import { useQuery } from "@tanstack/react-query";
import { getUserRepos } from "@/services";
import { GitHubRepository } from "@/types";

export function useUserRepos(username: string) {
  return useQuery<GitHubRepository[]>({
    queryKey: ["userRepos", username],
    queryFn: () => getUserRepos(username),
    enabled: !!username,
  });
}
