import React, { ReactNode } from "react";

interface CardBgWithImageProps {
  cardStyle: "planning" | "combat";
  lockedOrUnlockedUnits?: "locked" | "unlocked";
  saturation: "oversaturated" | "normal" | "half" | "quarter" | "zero";
  bgImage?: string;
  children?: ReactNode;
}

export default function CardBgWithImage({
  cardStyle,
  lockedOrUnlockedUnits,
  saturation,
  bgImage,
  children,
}: CardBgWithImageProps) {
  const bg = bgImage;

  const blurLockedUnitInfo =
    lockedOrUnlockedUnits === "locked" ? `blur-sm` : ``;

  const dimensions =
    cardStyle === "combat"
      ? `w-14 sm:w-24 md:w-28 lg:w-44 xl:w-56 h-full`
      : `h-28 w-32 sm:h-52 sm:w-52`;

  let saturate;
  switch (saturation) {
    case "oversaturated":
      saturate = "saturate-125";
      break;
    case "normal":
      saturate = "saturate-100";
      break;
    case "half":
      saturate = "saturate-50";
      break;
    case "quarter":
      saturate = "saturate-25";
      break;
    case "zero":
      saturate = "saturate-0";
      break;
    default:
      saturate = "saturate-100";
  }

  return (
    <div
      className={`${bg} ${dimensions} ${blurLockedUnitInfo} group grid grid-rows-5 rounded-lg bg-cover bg-center bg-no-repeat ${saturate}`}
    >
      {children}
    </div>
  );
}

/* TODO: Add health bar */
{
  /* <div
  className={`absolute left-0 right-0 bottom-[2.5%] mx-auto h-2 w-[95%] rounded-sm ${healthBarBackgroundColor} backdrop-blur-[1px] md:h-3`}
>
  <div
    className={`h-3 ${healthWidth} ${healthBarColor} rounded-sm transition-all duration-500 ease-out`}
  ></div>
</div> */
}
