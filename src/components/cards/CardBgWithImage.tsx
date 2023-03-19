import React, { ReactNode } from "react";
import { Unit } from "../../types";
import { returnHealthBarStyleObject } from "../../utils";

interface CardBgWithImageProps {
  cardStyle: "planning" | "combat";
  lockedOrUnlockedUnits?: "locked" | "unlocked";
  saturation: "oversaturated" | "normal" | "half" | "quarter" | "zero";
  bgImage?: string;
  unit?: Unit;
  children?: ReactNode;
}

export default function CardBgWithImage({
  cardStyle,
  lockedOrUnlockedUnits,
  saturation,
  bgImage,
  unit,
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

  /* TODO: Do same for <UnitTile> */
  let healthWidth, healthBarColor;
  if (cardStyle === "combat" && unit) {
    const healthBarStyleObject = returnHealthBarStyleObject(unit);
    healthWidth = healthBarStyleObject.healthWidth;
    healthBarColor = healthBarStyleObject.healthBarColor;
  }

  let healthBarBackgroundColor = /* currentHealth > 0 ?  */ `bg-black/80`; /*  : `bg-red-500/40` */

  return (
    <div
      className={`${bg} ${dimensions} ${blurLockedUnitInfo} group grid grid-rows-5 rounded-lg bg-cover bg-center bg-no-repeat ${saturate}`}
    >
      {children}
      {cardStyle === "combat" && (
        <div
          className={`absolute left-0 right-0 bottom-[2.5%] mx-auto h-2 w-[95%] rounded-sm ${
            cardStyle === "combat" && healthBarBackgroundColor
          } backdrop-blur-[1px] transition-all duration-500 ease-out md:h-4`}
        >
          <div
            className={`${healthWidth} ${healthBarColor} h-full rounded-sm transition-none duration-500 ease-out`}
          ></div>
        </div>
      )}
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
