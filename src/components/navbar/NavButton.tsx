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
  // sets the background image based on the button type
  const bg = bgImage;

  // these styles are dependent on the type of button you'd like to render
  let specialStyleBasedOnButtonType;
  switch (navButtonType) {
    // special styling for just the score
    case "score":
      specialStyleBasedOnButtonType = `justify-start text-xl text-green-400 rounded-r-lg hover:bg-green-400 hover:text-white`;
      break;
    // all other buttons have this as a base style
    default:
      specialStyleBasedOnButtonType = `cursor-pointer hover:bg-zinc-700 ${
        stateTrigger
          ? // if this navButton is selected, it'll have this style
            `font-semibold text-transparent saturate-150 translate-x-8 rounded-lg bg-zinc-700 hover:text-inherit`
          : // when unselected, it'll have this style
            `rounded-r-lg`
      }`;
  }

  // container styling, it has the image and is in the back
  const bgContainerStyle = `z-30 flex flex-wrap items-center justify-center overflow-x-auto border-2 border-zinc-900 bg-cover bg-center capitalize transition ease-in-out`;
  // overlay styling, it sits on top of the container and holds the text and transparent background
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
