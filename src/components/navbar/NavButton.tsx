import React, { ReactNode } from "react";
import { NavButtonType } from "../../types/NavButtons";

interface NavButtonProps {
  navButtonType: NavButtonType;
  buttonStyle: NavButtonType;
  stateTrigger: boolean;
  navButtonOn: (navButtonType: NavButtonType) => void;
  bgImage: string;
  children: ReactNode;
}

export default function NavButton({
  navButtonType,
  stateTrigger,
  navButtonOn,
  bgImage,
  children,
}: NavButtonProps) {
  const bg = bgImage;

  const overlay = stateTrigger ? `bg-black/0` : `bg-black/50 hover:bg-black/25`;

  let style;
  switch (navButtonType) {
    case "score":
      style = `justify-start text-xl hover:bg-green-400 rounded-r-lg hover:text-white ${
        stateTrigger
          ? `font-semibold saturate-150 text-white bg-green-400`
          : `text-green-400`
      }`;
      break;
    default:
      style = `cursor-pointer hover:bg-zinc-700 ${
        stateTrigger
          ? `font-semibold saturate-150 translate-x-8 rounded-lg bg-zinc-700`
          : `rounded-r-lg`
      }`;
  }

  return (
    <div
      className={`${bg} z-30 flex flex-wrap items-center justify-center overflow-x-auto border-2 border-zinc-900 bg-cover bg-center capitalize transition ease-in-out ${style}`}
    >
      <div
        className={`${overlay} z-50 flex h-full w-full items-center p-2 ${
          navButtonType === `score` ? `justify-start` : `justify-center`
        }`}
        onClick={() =>
          navButtonType === "score" ? null : navButtonOn(navButtonType)
        }
      >
        {children}
      </div>
    </div>
  );
}
