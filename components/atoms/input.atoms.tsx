import { DetailedHTMLProps, InputHTMLAttributes } from "react";

export function Input({
  className,
  ...props
}: DetailedHTMLProps<
  InputHTMLAttributes<HTMLInputElement>,
  HTMLInputElement
>) {
  return (
    <input
      className={`w-full p-4 mb-4 border border-gray-300 rounded-3xl dark:bg-gray-800 dark:border-gray-700 ${
        className || ""
      }`}
      {...props}
    />
  );
}
