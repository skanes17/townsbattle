import React from "react";

// images this component may need to use -- is there a better way?
import archeryHut from "../../assets/images/archeryHut-01.png";
import healingChamber from "../../assets/images/healingChamber-01.png";
import mealHall from "../../assets/images/mealHall-01.png";
import swordsmithy from "../../assets/images/swordsmithy-01.png";
import townCenter from "../../assets/images/townCenter-01.png";
import { BuildingType } from "../../types";

interface BldgCardImageProps {
  buildingType: BuildingType;
}

/* FIXME: Devise a way to show nameSymbol if no image path found */

export default function BldgCardImage({ buildingType }: BldgCardImageProps) {
  let src;
  switch (buildingType) {
    case "archeryHut":
      src = archeryHut;
      break;
    case "healingChamber":
      src = healingChamber;
      break;
    case "mealHall":
      src = mealHall;
      break;
    case "swordsmithy":
      src = swordsmithy;
      break;
    case "townCenter":
      src = townCenter;
      break;
    default:
      src = "";
      break;
  }

  return (
    <div className="flex h-28 items-start justify-center bg-center">
      <img className="mx-auto w-full " src={src} alt={`building`} />
    </div>
  );
}