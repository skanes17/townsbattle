import React from "react";

// images this component may need to use -- is there a better way?
import mealHall from "../../images/meal-hall-01.png";
import swordsmithy from "../../images/swordsmithy-01.png";
import townCenter from "../../images/town-center-01.png";
import { BuildingType } from "../../types";

interface CardImageProps {
  buildingType: BuildingType;
}

export default function CardImage({ buildingType }: CardImageProps) {
  let src;
  switch (buildingType) {
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
    <div className="start col-span-3 flex h-28 items-center justify-center">
      <img className="mx-auto w-28" src={src} alt={`building`} />
    </div>
  );
}
