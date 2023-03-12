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
      specialStyleBasedOnButtonType = `w-[72px] justify-start overflow-x-auto
      rounded-r-lg bg-green-900 text-start text-xs text-green-400 hover:text-white
      sm:w-36 sm:text-sm md:w-64 lg:text-lg xl:text-xl`;
      break;
    // all other buttons have this as a base style
    default:
      specialStyleBasedOnButtonType = `text-md cursor-pointer 
      hover:bg-zinc-700 sm:text-2xl lg:text-3xl ${
        stateTrigger
          ? // if this navButton is selected, it'll have this style
            `-translate-x-1/2 rounded-lg bg-zinc-700 font-semibold saturate-150
            text-transparent sm:text-amber-200 hover:text-amber-200 hover:translate-x-0 active:translate-x-0 sm:translate-x-4 sm:hover:translate-x-4
            sm:active:translate-x-4 lg:translate-x-8 lg:hover:translate-x-8 lg:active:translate-x-8`
          : // when unselected, it'll have this style
            `active:translate-0 -translate-x-[60%] rounded-r-lg text-transparent
            hover:translate-x-0 hover:text-amber-400 active:text-amber-400 sm:translate-x-0 sm:text-inherit`
      }`;
  }

  // container styling, it has the image and is in the back
  const bgContainerStyle = `z-30 flex flex-wrap items-center justify-center border-2
  border-zinc-900 bg-cover bg-top transition ease-in-out md:bg-center`;
  // overlay styling, it sits on top of the container and holds the text and transparent background
  const overlayStyle = `z-50 flex h-full w-full items-center p-1 capitalize transition
  duration-75 ease-in-out lg:p-2 ${
    stateTrigger
      ? `rounded-lg bg-black/0`
      : `bg-black/50 backdrop-blur-[1px] hover:bg-black/25 hover:backdrop-blur-none`
  } ${navButtonType === `score` ? `justify-start` : `justify-center`}`;

  const [play] = useSound(cardSlideSfx);

  return (
    <div
      className={`${bg} ${bgContainerStyle} ${specialStyleBasedOnButtonType} pointer-events-auto`}
    >
      <button
        type="button"
        className={`${overlayStyle}`}
        // sound only plays for non-score buttons, and when it's not already "on"
        onClick={() => {
          navButtonOn(navButtonType);
          if (navButtonType !== "score" && !stateTrigger) {
            play();
          }
        }}
      >
        {children}
      </button>
    </div>
  );
}
