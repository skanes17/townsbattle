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
    case "scoutUnit":
      bgImage = "bg-scoutUnit";
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
    /* TODO: Consider setting a minimum height for consistency -- eg. min-h-[16rem]*/
    <div
      className={`grid w-52 auto-rows-auto grid-cols-1 gap-1 rounded-lg border-t-4 border-l-4 border-r-4 border-gray-900/50 bg-white/5 hover:-translate-y-0.5 hover:shadow-lg hover:shadow-gray-500/50 ${bgImage} bg-cover bg-center  text-white`}
    >
      {children}
    </div>
  );
}

/*
// FIXME: Find a way to add a slight border -- see example code which would wrap the card
<div
className={`rounded-lg border border-white/10 hover:-translate-y-0.5 hover:shadow-lg hover:shadow-gray-500/50`}
>
</div>
*/
