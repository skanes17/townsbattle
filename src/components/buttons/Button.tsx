import React, { ReactNode } from "react";

export interface ButtonProps {
  buttonColor: "blue" | "red";
  onClick: () => void;
  children: ReactNode;
}

export default function Button({
  buttonColor,
  onClick,
  children,
}: ButtonProps) {
  return (
    <button
      type="button"
      className={`rounded py-2 px-4 text-xl font-bold text-white shadow-md transition duration-75 ease-in-out active:scale-100 ${
        buttonColor === "blue"
          ? "bg-blue-800 shadow-blue-800/50 hover:bg-blue-600"
          : "bg-red-700 shadow-red-800/50 hover:bg-red-500"
      }`}
      onClick={() => onClick()}
    >
      {children}
    </button>
  );
}
