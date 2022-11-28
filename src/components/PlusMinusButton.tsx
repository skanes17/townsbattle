import React from "react";

interface PlusMinusButtonProps {
  children: any;
  buttonType: "plus" | "minus";
  onClick: () => void;
}

export default function PlusMinusButton({
  children,
  buttonType,
  onClick,
}: PlusMinusButtonProps) {
  return (
    <button
      className={`bg-slate-200 hover:bg-${
        buttonType === "plus" ? "green" : "red"
      }-400 text-gray-800 font-semibold py-1 px-2 border border-gray-400 rounded shadow`}
      //@ts-ignore
      onClick={onClick}
    >
      {children}
    </button>
  );
}
