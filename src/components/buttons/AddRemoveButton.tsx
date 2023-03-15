import React from "react";

interface AddRemoveButtonProps {
  children: string;
  buttonType: "add" | "remove" | "plus 5" | "minus 5";
  onClick: () => void;
}

export default function AddRemoveButton({
  children,
  buttonType,
  onClick,
}: AddRemoveButtonProps) {
  let bgColor;

  switch (buttonType) {
    case "add":
      bgColor = "bg-emerald-700 shadow-emerald-700/50 hover:bg-emerald-500";
      break;
    case "remove":
      bgColor = "bg-red-700 shadow-red-700/50 hover:bg-red-500";
      break;
    case "plus 5":
      bgColor = "bg-emerald-900 shadow-emerald-900/50 hover:bg-emerald-500";
      break;
    case "minus 5":
      bgColor = "bg-deepRedDarker shadow-deepRedDarker/50 hover:bg-red-500";
      break;
  }

  return (
    <button
      type="button"
      className={`shadow ${bgColor} mb-1 min-w-full self-end rounded py-1 text-xs font-semibold text-white`}
      onClick={() => onClick()}
    >
      {children}
    </button>
  );
}

//rounded py-2 px-4 text-xl font-bold text-white
