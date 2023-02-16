import React, { useId } from "react";

interface MenuInputProps {
  header: string;
  placeholderText: string;
  value: string;
  onChange: (e: any) => void;
}

export default function MenuInput({
  header,
  placeholderText,
  value,
  onChange,
}: MenuInputProps) {
  // useId is a React hook that generatesa unique ID -- DON'T use for list items
  const menuInputId = useId();

  return (
    <div>
      <label
        htmlFor={menuInputId}
        className="my-2 block text-lg font-medium text-gray-900 dark:text-white"
      >
        {header}
      </label>
      {/* Could have nested input within label and removed htmlFor and id */}
      <input
        id={menuInputId}
        className="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:focus:border-blue-500 dark:focus:ring-blue-500"
        placeholder={placeholderText}
        value={value}
        onChange={onChange}
        required
      />
    </div>
  );
}
