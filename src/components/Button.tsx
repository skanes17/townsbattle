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
      className={`transition ease-in-out bg-${buttonColor}-500 text-white text-xl font-bold py-2 px-4 rounded hover:bg-${buttonColor}-700 hover:scale-105 active:scale-100`}
      /* className={`bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded`} */
      onClick={onClick}
    >
      {children}
    </button>
  );
}
