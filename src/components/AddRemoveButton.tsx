import React from "react";

interface AddRemoveButtonProps {
  children: any;
  buttonType: "plus" | "minus";
  onClick: () => void;
}

export default function AddRemoveButton({
  children,
  buttonType,
  onClick,
}: AddRemoveButtonProps) {
  return (
    <button
      className={`bg-slate-200 hover:bg-${
        buttonType === "plus" ? "green" : "red"
      }-400 rounded border border-gray-400 py-1 px-2 font-semibold text-gray-800 shadow`}
      //@ts-ignore
      onClick={onClick}
    >
      {children}
    </button>
  );
}
