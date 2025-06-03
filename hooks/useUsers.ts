import { useQuery } from "@tanstack/react-query";
import { getUsers } from "@/services";
import { GitHubUserSearchResult } from "@/types";

export function useUsers(query: string) {
  return useQuery<GitHubUserSearchResult>({
    queryKey: ["users", query],
    queryFn: () => getUsers(query),
    enabled: !!query,
  });
}
