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
  let bgColor;

  switch (buttonType) {
    case "add":
      bgColor = "bg-emerald-800 shadow-emerald-800/50 hover:bg-emerald-600";
      break;
    case "remove":
      bgColor = "bg-deepRed shadow-deepRed/50 hover:bg-red-600";
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
