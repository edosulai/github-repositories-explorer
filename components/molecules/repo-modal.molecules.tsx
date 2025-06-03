import { GitHubRepository } from "@/types";
import {
  Dialog,
  DialogBackdrop,
  DialogPanel,
  Transition,
} from "@headlessui/react";
import {
  ArrowPathIcon,
  CalendarIcon,
  ChevronDoubleDownIcon,
  ChevronDoubleUpIcon,
  CodeBracketIcon,
  DocumentTextIcon,
  ExclamationCircleIcon,
  EyeIcon,
  IdentificationIcon,
  LinkIcon,
  StarIcon,
  UserIcon,
  XMarkIcon,
} from "@heroicons/react/24/solid";
import ReactMarkdown from "react-markdown";
import rehypeRaw from "rehype-raw";
import remarkGfm from "remark-gfm";

interface RepoModalProps {
  selectedRepo: GitHubRepository;
  readmeContent: string;
  closeModal: () => void;
  isRepoDetailsOpen: boolean;
  toggleRepoDetails: () => void;
}

export function RepoModal({
  selectedRepo,
  readmeContent,
  closeModal,
  isRepoDetailsOpen,
  toggleRepoDetails,
}: RepoModalProps) {
  return (
    <Transition
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
      <Dialog
        open={selectedRepo !== null}
        onClose={closeModal}
        className="relative z-10"
      >
        <DialogBackdrop transition className="fixed inset-0 bg-black/50 transition-opacity data-[closed]:opacity-0 data-[enter]:duration-300 data-[enter]:ease-out data-[leave]:duration-200 data-[leave]:ease-in" />
        <div className="fixed inset-0 z-10 w-screen overflow-y-auto">
          <div className="flex min-h-screen items-end justify-center pt-12 text-center sm:items-center sm:p-0">
            <DialogPanel transition className="relative transform translate-y-0 scale-100 overflow-hidden rounded-3xl bg-white text-left shadow-xl transition-all duration-300 ease-out dark:bg-gray-800 data-[closed]:translate-y-4 data-[closed]:opacity-0 sm:my-8 sm:w-full sm:max-w-4xl data-[closed]:sm:translate-y-0 data-[closed]:sm:scale-95 data-[enter]:duration-300 data-[enter]:ease-out data-[leave]:duration-200 data-[leave]:ease-in">
              <div className="px-1 pb-1">
                <div className="ml-auto w-full my-2 flex flex-col">
                  <div className="flex gap-3 justify-end px-5">
                    {isRepoDetailsOpen ? (
                      <ChevronDoubleUpIcon
                        className="w-4 h-4 text-black bg-green-500 rounded-full font-bold cursor-pointer"
                        onClick={toggleRepoDetails}
                      />
                    ) : (
                      <ChevronDoubleDownIcon
                        className="w-4 h-4 text-white bg-transparent rounded-full font-bold cursor-pointer transition-colors duration-200 ease-in-out hover:bg-green-500"
                        onClick={toggleRepoDetails}
                      />
                    )}
                    <XMarkIcon
                      className="w-4 h-4 text-white bg-transparent rounded-full font-bold cursor-pointer transition-colors duration-200 ease-in-out hover:bg-red-500"
                      onClick={closeModal}
                    />
                  </div>
                  <Transition
                    show={isRepoDetailsOpen}
                    as="div"
                    enter="transition-all duration-300 ease-out"
                    enterFrom="opacity-0 translate-y-4"
                    enterTo="opacity-100 translate-y-0"
                    leave="transition-all duration-200 ease-in"
                    leaveFrom="opacity-1 translate-y-0"
                    leaveTo="opacity-0 translate-y-4"
                  >
                    <div className="w-full p-5">
                      <div className="grid grid-cols-3 gap-2 md:grid-cols-5">
                        <div className="flex gap-2 items-start">
                          <UserIcon className="w-5 h-5 text-blue-500" />
                          <span>Owner:</span>
                        </div>
                        <div className="col-span-2">
                          <a
                            href={selectedRepo.owner.html_url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-blue-500 no-underline hover:underline"
                          >
                            {selectedRepo.owner.login}
                          </a>
                        </div>
                        <div className="flex gap-2 items-start">
                          <StarIcon className="w-5 h-5 text-yellow-400" />
                          <span>Stars:</span>
                        </div>
                        <div className="col-span-2 md:col-auto">
                          <span>{selectedRepo.stargazers_count}</span>
                        </div>
                        <div className="flex gap-2 items-start">
                          <IdentificationIcon className="w-5 h-5 text-blue-500" />
                          <span>Name:</span>
                        </div>
                        <div className="col-span-2">
                          <span>{selectedRepo.name}</span>
                        </div>
                        <div className="flex gap-2 items-start">
                          <ArrowPathIcon className="w-5 h-5 text-green-500" />
                          <span>Forks:</span>
                        </div>
                        <div className="col-span-2 md:col-auto">
                          <span>{selectedRepo.forks_count}</span>
                        </div>
                        <div className="flex gap-2 items-start">
                          <DocumentTextIcon className="w-5 h-5 text-blue-500" />
                          <span>Description:</span>
                        </div>
                        <div className="col-span-2">
                          <span>{selectedRepo.description}</span>
                        </div>
                        <div className="flex gap-2 items-start">
                          <ExclamationCircleIcon className="w-5 h-5 text-red-500" />
                          <span>Open Issues:</span>
                        </div>
                        <div className="col-span-2 md:col-auto">
                          <span>{selectedRepo.open_issues_count}</span>
                        </div>
                        <div className="flex gap-2 items-start">
                          <CodeBracketIcon className="w-5 h-5 text-blue-500" />
                          <span>Language:</span>
                        </div>
                        <div className="col-span-2">
                          <span>{selectedRepo.language}</span>
                        </div>
                        <div className="flex gap-2 items-start">
                          <EyeIcon className="w-5 h-5 text-purple-500" />
                          <span>Watchers:</span>
                        </div>
                        <div className="col-span-2 md:col-auto">
                          <span>{selectedRepo.watchers_count}</span>
                        </div>
                        <div className="flex gap-2 items-start">
                          <LinkIcon className="w-5 h-5 text-blue-500" />
                          <span>Repository URL:</span>
                        </div>
                        <div className="col-span-2">
                          <a
                            href={selectedRepo.html_url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-blue-500 no-underline hover:underline"
                          >
                            {selectedRepo.html_url}
                          </a>
                        </div>
                        <div className="flex gap-2 items-start">
                          <CalendarIcon className="w-5 h-5 text-gray-500" />
                          <span>Created At:</span>
                        </div>
                        <div className="col-span-2 md:col-auto">
                          <span>
                            {new Date(
                              selectedRepo.created_at
                            ).toLocaleDateString()}
                          </span>
                        </div>
                        <div className="hidden md:block" />
                        <div className="col-span-2 hidden md:block" />
                        <div className="flex gap-2 items-start">
                          <CalendarIcon className="w-5 h-5 text-gray-500" />
                          <span>Updated At:</span>
                        </div>
                        <div className="col-span-2 md:col-auto">
                          <span>
                            {new Date(
                              selectedRepo.updated_at
                            ).toLocaleDateString()}
                          </span>
                        </div>
                      </div>
                    </div>
                  </Transition>
                </div>
                <div className="markdown-body px-4 pt-5 pb-4 rounded-3xl">
                  <ReactMarkdown
                    remarkPlugins={[remarkGfm]}
                    rehypePlugins={[rehypeRaw]}
                  >
                    {readmeContent}
                  </ReactMarkdown>
                </div>
              </div>
            </DialogPanel>
          </div>
        </div>
      </Dialog>
    </Transition>
  );
}
