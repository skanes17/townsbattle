import React, { ReactNode } from "react";
import { NavButtonType } from "../../types/NavButtons";

interface NavButtonProps {
  buttonStyle: NavButtonType;
  stateTrigger: boolean;
  navButtonOn: (navButtonType: NavButtonType) => void;
  navButtonType: NavButtonType;
  children: ReactNode;
}

export default function NavButton({
  buttonStyle,
  stateTrigger,
  navButtonOn,
  navButtonType,
  children,
}: NavButtonProps) {
  let style;
  switch (buttonStyle) {
    case "score":
      style = `hover:bg-green-400 hover:text-white ${
        stateTrigger
          ? `text-white translate-x-5 rounded-lg bg-green-400`
          : `text-green-400 rounded-r-lg`
      }`;
      break;
    case "tips":
      style = `cursor-pointer hover:bg-amber-500 hover:text-white ${
        stateTrigger
          ? `text-white translate-x-5 rounded-lg bg-amber-500`
          : `text-amber-500 rounded-r-lg`
      }`;
      break;
    default:
      style = `cursor-pointer hover:bg-zinc-700 ${
        stateTrigger ? `translate-x-5 rounded-lg bg-zinc-700` : `rounded-r-lg`
      }`;
  }

  return (
    <div
      className={`flex flex-wrap items-center justify-center overflow-x-auto border border-zinc-900/50 bg-zinc-800 capitalize transition duration-75 ease-in-out ${style}`}
      onClick={() => navButtonOn(navButtonType)}
    >
      {children}
    </div>
  );
}
