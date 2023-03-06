import React, { ReactNode } from "react";

interface NavButtonProps {
  buttonStyle: "default" | "score" | "tips";
  stateTrigger: boolean;
  children: ReactNode;
}

export default function NavButton({
  buttonStyle,
  stateTrigger,
  children,
}: NavButtonProps) {
  let style;
  switch (buttonStyle) {
    case "default":
      style = `hover:bg-zinc-700 ${
        stateTrigger ? `translate-x-5 rounded-lg bg-zinc-700` : `rounded-r-lg`
      }`;
      break;
    case "score":
      style = `hover:bg-green-400 hover:text-white ${
        stateTrigger
          ? `text-white translate-x-5 rounded-lg bg-green-400`
          : `text-green-400 rounded-r-lg`
      }`;
      break;
    case "tips":
      style = `hover:bg-amber-500 hover:text-white ${
        stateTrigger
          ? `text-white translate-x-5 rounded-lg bg-amber-500`
          : `text-amber-500 rounded-r-lg`
      }`;
      break;
    default:
      style = `hover:bg-zinc-700 ${
        stateTrigger ? `translate-x-5 rounded-lg bg-zinc-700` : `rounded-r-lg`
      }`;
  }

  return (
    <div
      className={`flex items-center justify-center border border-zinc-900/50 bg-zinc-800 transition duration-75 ease-in-out ${style}`}
    >
      {children}
    </div>
  );
}
