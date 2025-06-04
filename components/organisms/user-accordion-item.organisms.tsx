import {
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
  Loading,
  RepoList,
} from "@/components";
import { useUserRepos } from "@/hooks";
import { GitHubRepository, GitHubUser } from "@/types";
import Image from "next/image";

interface UserAccordionItemProps {
  user: GitHubUser;
  isReadmeLoading: boolean;
  selectedRepo: GitHubRepository | null;
  handleRepoClick: (repo: GitHubRepository) => void;
}

/**
 * Accordion item component for displaying user information and repositories
 * @param {object} props - Component props
 * @param {GitHubUser} props.user - GitHub user data
 * @param {boolean} props.isReadmeLoading - Loading state for README content
 * @param {GitHubRepository | null} props.selectedRepo - Currently selected repository
 * @param {(repo: GitHubRepository) => void} props.handleRepoClick - Click handler for repositories
 * @returns {JSX.Element} - Accordion item with user info and repositories
 * @example
 * <UserAccordionItem
 *   user={githubUser}
 *   isReadmeLoading={loading}
 *   selectedRepo={selected}
 *   handleRepoClick={handleClick}
 * />
 */
export function UserAccordionItem({
  user,
  isReadmeLoading,
  selectedRepo,
  handleRepoClick,
}: UserAccordionItemProps) {
  const {
    data: repos,
    isLoading: isReposLoading,
    error: reposError,
  } = useUserRepos(user.login);

  return (
    <AccordionItem value={user.login} key={user.id}>
      <AccordionTrigger>
        <div className="flex items-center gap-2">
          <Image
            src={user.avatar_url}
            alt={user.login}
            width={24}
            height={24}
            className="rounded-full"
          />
          <span>{user.login}</span>
        </div>
      </AccordionTrigger>
      <AccordionContent className="!max-h-none !overflow-visible">
        {isReposLoading && <Loading />}
        {reposError && (
          <p className="text-center text-red-500">{reposError.message}</p>
        )}
        {repos && repos.length > 0 ? (
          <RepoList
            data={repos}
            handleRepoClick={handleRepoClick}
            isReadmeLoading={
              isReadmeLoading && selectedRepo?.owner.login === user.login
            }
            selectedRepo={selectedRepo}
          />
        ) : (
          !isReposLoading && (
            <div className="text-center text-gray-500">
              No repositories found.
            </div>
          )
        )}
      </AccordionContent>
    </AccordionItem>
  );
}
