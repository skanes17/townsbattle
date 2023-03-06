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
      style = `justify-start text-xl hover:bg-green-400 rounded-r-lg hover:text-white ${
        stateTrigger ? `text-white bg-green-400` : `text-green-400`
      }`;
      break;
    case "tips":
      style = `cursor-pointer rounded-r-lg hover:bg-amber-500 hover:text-white ${
        stateTrigger
          ? `translate-x-3 text-white bg-amber-500`
          : `text-amber-500`
      }`;
      break;
    default:
      style = `cursor-pointer hover:bg-zinc-700 ${
        stateTrigger ? `translate-x-3 rounded-lg bg-zinc-700` : `rounded-r-lg`
      }`;
  }

  return (
    <div
      className={`z-50 flex flex-wrap items-center justify-center overflow-x-auto border border-zinc-900/50 bg-zinc-800 capitalize transition duration-75 ease-in-out ${style}`}
      onClick={() =>
        navButtonType === "score" ? null : navButtonOn(navButtonType)
      }
    >
      {children}
    </div>
  );
}
