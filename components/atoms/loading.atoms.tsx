import { ArrowPathIcon } from "@heroicons/react/24/solid";

/**
 * Loading spinner component
 * @returns {JSX.Element} - Animated loading spinner
 * @example
 * <Loading />
 */
export function Loading() {
  return (
    <div
      data-testid="loading-indicator"
      className="flex justify-center items-center w-full h-screen"
      role="status"
    >
      <ArrowPathIcon className="text-blue-500 w-10 h-10 animate-spin" />
    </div>
  );
}
