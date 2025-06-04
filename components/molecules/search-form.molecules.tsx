/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { Input } from "@/components";
import { UserUsersFormData } from "@/schemas";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect } from "react";
import { FormProvider, UseFormReturn } from "react-hook-form";

interface SearchFormProps {
  methods: UseFormReturn<UserUsersFormData, any, UserUsersFormData>;
}

/**
 * Search form component that manages search state and URL parameters
 * @param {Object} props - Component props
 * @param {UseFormReturn<UserUsersFormData>} props.methods - Form methods from react-hook-form
 * @returns {JSX.Element} - Form component with search input that syncs with URL
 */
export function SearchForm({ methods }: SearchFormProps) {
  const { register, watch, setValue } = methods;
  const username = watch("username");
  const router = useRouter();
  const searchParams = useSearchParams();

  useEffect(() => {
    const initialUsername = searchParams.get("q") || "";
    setValue("username", initialUsername);
  }, [searchParams, setValue]);

  useEffect(() => {
    const newParams = new URLSearchParams(searchParams.toString());
    if (username) {
      newParams.set("q", username);
    } else {
      newParams.delete("q");
    }
    router.push(`/?${newParams.toString()}`);
  }, [username, router, searchParams]);

  return (
    <FormProvider {...methods}>
      <Input {...register("username")} placeholder="Search by name" />
    </FormProvider>
  );
}
