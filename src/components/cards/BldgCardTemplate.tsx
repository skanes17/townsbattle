import React, { ReactNode } from "react";
import { BuildingType } from "../../types";

interface BldgCardTemplateProps {
  buildingType: BuildingType;
  children: ReactNode;
}

export default function BldgCardTemplate({
  buildingType,
  children,
}: BldgCardTemplateProps) {
  let bgImage;
  switch (buildingType) {
    case "archeryHut":
      bgImage = "bg-archeryHut";
      break;
    case "healingChamber":
      bgImage = "bg-healingChamber";
      break;
    case "mealHall":
      bgImage = "bg-mealHall";
      break;
    case "swordsmithy":
      bgImage = "bg-swordsmithy";
      break;
    case "townCenter":
      bgImage = "bg-townCenter";
      break;
    default:
      bgImage = "";
      break;
  }

  return (
    /* // FIXME: Get consistent height without it looking weird
    <div className="grid h-auto w-44 auto-rows-auto grid-cols-3 gap-1 rounded-md border-4 border-blue-900 bg-white pb-2 text-black shadow-md shadow-gray-500/50 transition ease-in-out hover:scale-105"> */
    <div className="rounded-lg border border-white/10 hover:-translate-y-0.5 hover:shadow-lg hover:shadow-gray-500/50">
      <div
        className={`grid w-52 auto-rows-auto gap-1 rounded-lg border-t-4 border-l-4 border-r-4 border-gray-900/50 bg-white/5 ${bgImage} bg-cover bg-center text-white`}
      >
        {children}
      </div>
    </div>
  );
}
