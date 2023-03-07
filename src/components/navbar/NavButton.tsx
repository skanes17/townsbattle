import React, { ReactNode } from "react";
import useSound from "use-sound";
import { NavButtonType } from "../../types/NavButtons";
/* @ts-ignore */
import cardSlideSfx from "../../assets/sounds/cardSlide.mp3";

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
  /* TODO: Refactor eventually so score is taken out of this component and made into its own */
  switch (navButtonType) {
    // special styling for just the score
    case "score":
      specialStyleBasedOnButtonType = `opacity-50 hover:opacity-100 sm:opacity-100 justify-start rounded-r-lg text-xs sm:text-sm lg:text-lg xl:text-xl text-green-400 hover:text-white`;
      break;
    // all other buttons have this as a base style
    default:
      specialStyleBasedOnButtonType = `cursor-pointer lg:text-3xl sm:text-2xl text-md hover:bg-zinc-700 ${
        stateTrigger
          ? // if this navButton is selected, it'll have this style
            `lg:translate-x-8 active:translate-x-0 sm:active:translate-x-4 hover-translate-x-0 sm:hover:translate-x-4 hover:translate-x-0 -translate-x-1/2 sm:translate-x-4 rounded-lg bg-zinc-700 font-semibold text-transparent saturate-150 hover:text-inherit`
          : // when unselected, it'll have this style
            `hover:translate-x-0 -translate-x-3/4 active:text-inherit hover:text-inherit text-transparent sm:text-inherit active:translate-0 rounded-r-lg`
      }`;
  }

  // container styling, it has the image and is in the back
  const bgContainerStyle = `sm:translate-x-0 z-30 flex flex-wrap items-center justify-center border-2 border-zinc-900 bg-cover bg-top md:bg-center capitalize transition ease-in-out`;
  // overlay styling, it sits on top of the container and holds the text and transparent background
  const overlayStyle = `z-50 flex h-full w-full items-center p-1 lg:p-2 transition duration-75 ease-in-out ${
    stateTrigger
      ? `bg-black/0 rounded-lg`
      : `bg-black/50 backdrop-blur-[1px] hover:bg-black/25 hover:backdrop-blur-none`
  } ${navButtonType === `score` ? `justify-start` : `justify-center`}`;

  const [play] = useSound(cardSlideSfx);

  return (
    <div
      className={`${bg} ${bgContainerStyle} ${specialStyleBasedOnButtonType}`}
    >
      <div
        className={`${overlayStyle}`}
        /* FIXME: Would like to only play sound when a card slides out, not always when clicked */
        onClick={() => {
          navButtonOn(navButtonType);
          if (navButtonType !== "score" && !stateTrigger) {
            play();
          }
        }}
      >
        {children}
      </div>
    </div>
  );
}
