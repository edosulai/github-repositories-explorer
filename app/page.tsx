"use client";

import { Accordion, Input, Loading, RepoModal } from "@/components";
import { UserAccordionItem } from "@/components/organisms/user-accordion-item.organisms";
import { useRepoReadme, useUsers } from "@/hooks";
import { UserReposFormData, userReposSchema } from "@/schemas";
import { GitHubRepository, GitHubUser } from "@/types";
import { Transition } from "@headlessui/react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { FormProvider, useForm } from "react-hook-form";

export default function Home() {
  const methods = useForm<UserReposFormData>({
    resolver: zodResolver(userReposSchema),
  });

  const { register, watch } = methods;
  const username = watch("username");

  const {
    data: usersData,
    error: usersError,
    isLoading: isUsersLoading,
  } = useUsers(username);

  const [selectedRepo, setSelectedRepo] = useState<GitHubRepository | null>(
    null
  );
  const [isRepoDetailsOpen, setIsRepoDetailsOpen] = useState(false);

  const { data: readmeContent, isLoading: isReadmeLoading } = useRepoReadme(
    selectedRepo?.owner.login ?? "",
    selectedRepo?.name
  );

  const handleRepoClick = async (repo: GitHubRepository) => {
    setSelectedRepo(repo);
  };

  const closeModal = () => {
    setSelectedRepo(null);
    setIsRepoDetailsOpen(false);
  };

  const toggleRepoDetails = () => {
    setIsRepoDetailsOpen((prev) => !prev);
  };

  return (
    <main className="min-h-screen p-8 pb-20 lg:p-20 dark:bg-[#111827b3] dark:text-white/70">
      <FormProvider {...methods}>
        <Input {...register("username")} placeholder="Search by name" />
      </FormProvider>
      {isUsersLoading && <Loading />}
      {usersError && (
        <p className="text-center text-red-500">{usersError.message}</p>
      )}
      {usersData && usersData.items.length > 0 ? (
        <Accordion collapsible className="w-full space-y-2">
          {usersData.items.map((user: GitHubUser) => (
            <UserAccordionItem
              key={user.id}
              user={user}
              isReadmeLoading={isReadmeLoading}
              selectedRepo={selectedRepo}
              handleRepoClick={handleRepoClick}
            />
          ))}
        </Accordion>
      ) : (
        <Transition
          appear
          show
          as="div"
          enter="transition-all duration-[2000ms] ease-out"
          enterFrom="opacity-0 translate-y-4"
          enterTo="opacity-100 translate-y-0"
          leave="transition-all duration-200 ease-in"
          leaveFrom="opacity-1 translate-y-0"
          leaveTo="opacity-0 translate-y-4"
        >
          <div className="mt-20 text-5xl text-center animate-[blink_7s_infinite] text-transparent bg-clip-text bg-gradient-to-r from-blue-500 via-green-500 to-red-500 lg:mt-40 lg:text-8xl">
            Type Something ...
          </div>
          <div
            className="
          relative flex place-items-center animate-[blink_9s_infinite]
          before:absolute
          before:z-[-50]
          before:h-[180px]
          before:w-[200px]
          before:top-0
          before:left-[100px]
          before:bg-gradient-to-br
          before:from-[#f006]
          before:to-[#66b3ff66]
          before:rounded-full
          before:blur-[16px]
          before:animate-[blob_7s_infinite]
          lg:before:w-[300px]
        
          after:absolute
          after:z-[-50]
          after:h-[180px]
          after:w-[200px]
          after:right-[100px]
          after:bottom-0
          after:bg-gradient-to-tl
          after:from-[#9ccc6566]
          after:to-[#66b3ff66]
          after:rounded-full
          after:blur-[16px]
          after:animate-[blob_7s_infinite] 
          lg:after:w-[300px]
          "
          />
        </Transition>
      )}
      {selectedRepo && readmeContent && (
        <RepoModal
          selectedRepo={selectedRepo}
          readmeContent={readmeContent}
          closeModal={closeModal}
          isRepoDetailsOpen={isRepoDetailsOpen}
          toggleRepoDetails={toggleRepoDetails}
        />
      )}
    </main>
  );
}
