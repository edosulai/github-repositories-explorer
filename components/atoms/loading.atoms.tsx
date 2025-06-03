import { ArrowPathIcon } from "@heroicons/react/24/solid";

export function Loading() {
  return (
    <div className="flex justify-center items-center w-full h-screen">
      <ArrowPathIcon className="text-blue-500 w-10 h-10 animate-spin" />
    </div>
  );
}
