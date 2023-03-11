import React, { ReactNode } from "react";
import { BaseResourceType, Resources } from "../../types";

interface CardHoverTextProps {
  lockedOrUnlockedUnits?: "locked" | "unlocked";
  children: ReactNode;
}

export default function CardHoverText({
  lockedOrUnlockedUnits,
  children,
}: CardHoverTextProps) {
  let lockedAndUnlockedStyles;
  switch (lockedOrUnlockedUnits) {
    case "unlocked":
      lockedAndUnlockedStyles = `row-span-4 m-auto flex w-3/4 place-items-center items-center justify-center rounded-sm border-slate-300 bg-slate-300/90 p-2 text-center text-xs font-semibold text-black opacity-0 shadow-md backdrop-grayscale group-hover:opacity-100 group-active:opacity-100`;
      break;
    case "locked":
      /* this is relative to the card template */
      lockedAndUnlockedStyles = `absolute top-0 right-0 left-0 bottom-0 row-span-5 m-auto grid items-center rounded-lg rounded-sm border-2 border-[#1DEDB9] bg-[#085E48]/50 p-2 text-center text-xl font-semibold text-white opacity-0 shadow-md backdrop-grayscale group-hover/wholeCard:opacity-100 group-hover/wholeCard:active:opacity-100 sm:text-2xl`;
      break;
    default:
      lockedAndUnlockedStyles = `row-span-4 m-auto flex w-3/4 place-items-center items-center justify-center rounded-sm border-slate-300 bg-slate-300/90 p-2 text-center text-xs font-semibold text-black opacity-0 shadow-md backdrop-grayscale group-hover:opacity-100 group-active:opacity-100 sm:text-sm`;
  }

  /* FIXME: Consolidate the above styles! DRY */
  return (
    <div className={`${lockedAndUnlockedStyles} sm:text-sm`}>{children}</div>
  );
}
