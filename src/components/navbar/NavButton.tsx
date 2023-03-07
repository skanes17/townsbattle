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

  let specialStyleBasedOnButtonType;
  switch (navButtonType) {
    case "score":
      specialStyleBasedOnButtonType = `justify-start text-xl hover:bg-green-400 rounded-r-lg hover:text-white ${
        stateTrigger
          ? `font-semibold saturate-150 text-white bg-green-400`
          : `text-green-400`
      }`;
      break;
    default:
      specialStyleBasedOnButtonType = `cursor-pointer hover:bg-zinc-700 ${
        stateTrigger
          ? `font-semibold saturate-150 translate-x-8 rounded-lg bg-zinc-700`
          : `rounded-r-lg`
      }`;
  }

  const bgContainerStyle = `z-30 flex flex-wrap items-center justify-center overflow-x-auto border-2 border-zinc-900 bg-cover bg-center capitalize transition ease-in-out`;
  const overlayStyle = `z-50 flex h-full w-full items-center p-2 transition duration-75 ease-in-out ${
    stateTrigger
      ? `bg-black/0`
      : `bg-black/50 backdrop-blur-[1px] hover:bg-black/25 hover:backdrop-blur-none`
  } ${navButtonType === `score` ? `justify-start` : `justify-center`}`;

  return (
    <div
      className={`${bg} ${bgContainerStyle} ${specialStyleBasedOnButtonType}`}
    >
      <div
        className={`${overlayStyle}`}
        onClick={() =>
          navButtonType === "score" ? null : navButtonOn(navButtonType)
        }
      >
        {children}
      </div>
    </div>
  );
}
