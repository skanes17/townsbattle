import React from "react";

export interface SubmitButtonProps {
  buttonColor: "blue" | "red";
  onClick: () => void;
  children: string;
}

export default function SubmitButton({
  buttonColor,
  onClick,
  children,
}: SubmitButtonProps) {
  return (
    <button
      type="submit"
      className={`transition ease-in-out ${
        buttonColor === "blue" ? "bg-blue-800" : "bg-red-700"
      } rounded border border-white/40 py-2 px-4 text-xl font-bold text-white ${
        buttonColor === "blue" ? "hover:bg-blue-600" : "hover:bg-red-500"
      } duration-75 active:scale-100`}
      onClick={onClick}
    >
      {children}
    </button>
  );
}
