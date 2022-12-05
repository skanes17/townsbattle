import React from "react";

export interface ButtonProps {
  buttonColor: "blue" | "red";
  onClick: () => void;
  children: any;
}

export default function Button({
  buttonColor,
  onClick,
  children,
}: ButtonProps) {
  return (
    <button
      className={`transition ease-in-out ${
        buttonColor === "blue" ? "bg-blue-600" : "bg-red-500"
      } rounded border border-white/40 py-2 px-4 text-xl font-bold text-white ${
        buttonColor === "blue" ? "hover:bg-blue-800" : "hover:bg-red-700"
      } duration-75 active:scale-100`}
      onClick={onClick}
    >
      {children}
    </button>
  );
}
