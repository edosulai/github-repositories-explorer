import { GitHubRepository } from "@/types";
import { Transition } from "@headlessui/react";
import {
  ArrowPathIcon,
  CodeBracketIcon,
  StarIcon,
} from "@heroicons/react/24/solid";

interface RepoListProps {
  data: GitHubRepository[];
  handleRepoClick: (repo: GitHubRepository) => void;
  isReadmeLoading: boolean;
  selectedRepo: GitHubRepository | null;
}

export function RepoList({
  data,
  handleRepoClick,
  isReadmeLoading,
  selectedRepo,
}: RepoListProps) {
  return (
    <ul className="[&>*+*]:mt-4">
      {data.map((repo) => (
        <Transition
          key={repo.id}
          appear
          show
          as="div"
          enter="transition-all duration-300 ease-out"
          enterFrom="opacity-0 translate-y-4"
          enterTo="opacity-100 translate-y-0"
          leave="transition-all duration-200 ease-in"
          leaveFrom="opacity-1 translate-y-0"
          leaveTo="opacity-0 translate-y-4"
        >
          <li
            key={repo.id}
            className="border border-gray-300 rounded-3xl bg-white cursor-pointer transition-[padding-top] duration-200 ease-in-out hover:pt-1 dark:bg-gray-800 dark:border-gray-700"
            onClick={() => handleRepoClick(repo)}
          >
            <div className="px-4 pt-5 pb-4 bg-[#0d1117] rounded-3xl relative">
              {isReadmeLoading && selectedRepo?.id == repo.id && (
                <div className="flex justify-center items-center w-full absolute inset-0">
                  <ArrowPathIcon className="text-blue-500 w-10 h-10 animate-spin" />
                </div>
              )}
              <span className="text-blue-500 whitespace-nowrap overflow-hidden text-ellipsis hover:underline dark:text-blue-300">
                {repo.name}
              </span>
              <p className="mt-2 text-sm text-gray-600 whitespace-nowrap overflow-hidden text-ellipsis dark:text-gray-400">
                {repo.description}
              </p>
              <div className="mt-2 flex flex-wrap gap-2">
                {repo.topics.map((topic) => (
                  <span
                    key={topic}
                    className="px-2 py-1 text-xs font-medium text-gray-900 bg-gray-200 rounded-3xl dark:bg-gray-700 dark:text-gray-300"
                  >
                    {topic}
                  </span>
                ))}
              </div>
              <div className="mt-4 flex items-center text-gray-600 gap-4 dark:text-gray-400">
                <div className="flex items-center gap-1">
                  <StarIcon className="w-5 h-5 text-yellow-400" />
                  <span>{repo.stargazers_count}</span>
                </div>
                <div className="flex items-center gap-1">
                  <ArrowPathIcon className="w-5 h-5 text-green-500" />
                  <span>{repo.forks_count}</span>
                </div>
                <div className="flex items-center gap-1">
                  <CodeBracketIcon className="w-5 h-5 text-blue-500" />
                  <span>{repo.language}</span>
                </div>
              </div>
            </div>
          </li>
        </Transition>
      ))}
    </ul>
  );
}
