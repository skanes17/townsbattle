import React from "react";

interface AddRemoveButtonProps {
  children: any;
  buttonColor: "blue" | "red";
  onClick: () => void;
}

export default function AddRemoveButton({
  children,
  buttonColor,
  onClick,
}: AddRemoveButtonProps) {
  return (
    <button
      className={`${buttonColor === "blue" ? "bg-sky-600" : "bg-red-600"} ${
        buttonColor === "blue" ? "hover:bg-sky-700" : "hover:bg-red-700"
      } rounded border border-gray-400 py-1 px-3 font-semibold text-white shadow`}
      //@ts-ignore
      onClick={onClick}
    >
      {children}
    </button>
  );
}

//rounded py-2 px-4 text-xl font-bold text-white
