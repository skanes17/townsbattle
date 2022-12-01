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
        buttonColor === "blue" ? "bg-blue-500" : "bg-red-500"
      } rounded py-2 px-4 text-xl font-bold text-white hover:${
        buttonColor === "blue" ? "bg-blue-700" : "bg-red-700"
      } duration-75 hover:scale-105 active:scale-100`}
      onClick={onClick}
    >
      {children}
    </button>
  );
}
