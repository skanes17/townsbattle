import React from "react";

export interface ButtonProps {
  buttonColor: string;
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
      className={`bg-${buttonColor}-500 hover:bg-${buttonColor}-700 text-white font-bold py-2 px-4 rounded`}
      onClick={onClick}
    >
      {children}
    </button>
  );
}
