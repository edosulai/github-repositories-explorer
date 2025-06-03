import { useQuery } from "@tanstack/react-query";
import { getRepoReadme } from "@/services";

export function useRepoReadme(username: string, repoName: string | undefined) {
  return useQuery({
    queryKey: ["repoReadme", repoName],
    queryFn: () => getRepoReadme(username, repoName!),
    enabled: !!repoName,
  });
}
