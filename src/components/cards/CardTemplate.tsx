import React, { ReactNode } from "react";
import { BuildingType, ResourceType, UnitType } from "../../types";

interface CardTemplateProps {
  lockedOrUnlockedUnits?: "locked" | "unlocked";
  color:
    | "blue"
    | "red"
    | "orange"
    | "amber"
    | "green"
    | "resources"
    | "buildings";
  children: ReactNode;
}

export default function CardTemplate({
  lockedOrUnlockedUnits,
  color,
  children,
}: CardTemplateProps) {
  let bgColor = `bg-${color}-800/5`;

  switch (color) {
    case "blue":
      bgColor = "bg-gradient-to-r from-slate-800/70 to-slate-900/70";
      break;
    case "red":
      bgColor = "bg-gradient-to-r from-red-700/30 to-red-900/30";
      break;
    case "orange":
      bgColor = "bg-gradient-to-r from-orange-600/30 to-orange-900/30";
      break;
    case "amber":
      bgColor = "bg-amber-800/5";
      break;
    case "green":
      bgColor = "bg-gradient-to-r from-[#05392C]/70 to-[#02130F]/70";
      break;
    case "resources":
      bgColor = "bg-gradient-to-r from-[#431E0F]/70 to-[#210F08]/70";
      break;
    case "buildings":
      bgColor = "bg-buildingsColor";
      break;
  }

  return (
    /* TODO: Different colored borders backgrounds and blur as necessary */
    // only difference between this and BldfCardTemplate is border-b-0 in BldgCardTemplate
    <div
      className={`group/wholeCard relative m-1 grid w-32 auto-rows-auto justify-around rounded-lg sm:m-2 sm:w-52 ${bgColor} text-white hover:-translate-y-0.5 hover:shadow-lg hover:shadow-gray-500/50`}
    >
      {children}
    </div>
  );
}
