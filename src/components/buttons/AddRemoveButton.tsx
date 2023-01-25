import React from "react";

interface AddRemoveButtonProps {
  children: string;
  buttonType: "add" | "remove";
  onClick: () => void;
}

export default function AddRemoveButton({
  children,
  buttonType,
  onClick,
}: AddRemoveButtonProps) {
  return (
    <button
      type="button"
      className={`${buttonType === "add" ? "bg-emerald-900" : "bg-red-900"} ${
        buttonType === "add" ? "hover:bg-emerald-700" : "hover:bg-red-700"
      } min-w-full rounded border border-gray-400 py-1 text-xs font-semibold text-white shadow`}
      //@ts-ignore
      onClick={() => onClick()}
    >
      {children}
    </button>
  );
}

//rounded py-2 px-4 text-xl font-bold text-white
