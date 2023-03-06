import React from "react";
import { Buildings } from "../../types";
import {
  BldgCardTemplate,
  BldgCardFooter,
  NewCardHeader,
  BldgCardDescription,
} from "../cards";
import CardHoverText from "../cards/CardHoverText";
import { SpacerDiv } from "../layout/SpacerDiv";

interface DisplayBuildingsProps {
  buildings: Buildings;
}

export default function DisplayBuildings({ buildings }: DisplayBuildingsProps) {
  // Filter returns the buildings data for constructed buildings
  // Object.keys(buildings) then returns only the keys (names) for those enabled buildings
  const constructedBuildings = Object.keys(buildings).filter(
    (key) => buildings[key].constructed
  );

  return (
    <>
      {constructedBuildings.map((buildingType) => (
        <BldgCardTemplate bgImage={buildings[buildingType].bgImage}>
          <NewCardHeader cardName={buildings[buildingType].name} />
          {/* <CardHoverText>{buildings[buildingType].description}</CardHoverText> */}
          <BldgCardDescription
            descriptionText={buildings[buildingType].description}
          />
          <BldgCardFooter
            tier={buildings[buildingType].tier}
            currentHealth={buildings[buildingType].currentHealth}
            maxHealth={buildings[buildingType].maxHealth}
          />
        </BldgCardTemplate>
      ))}
    </>
  );
}

/* With Flex
  
  <div>
      <div className="font-bold">Buildings Constructed</div>
      <div className="flex">
        {constructedBuildings.map((buildingType) => (
          <div className="bg-white text-black w-48 p-2 rounded-md shadow-md shadow-gray-500/50 flex flex-col items-center">
            <div className="p-0.5 font-bold">
              {buildings[buildingType].name}
            </div>
            <div className="flex-1 border-slate-300"></div>
            <div className="p-0.5 h-16">
              <img
                className="w-16 h-16"
                src={townCenter}
                alt={`image of building`}
              />
            </div>
            <div className="shadow-sm bg-amber-100 mx-1 my-0.5 p-1 border-slate-300 rounded-sm">
              {buildings[buildingType].effect === "" ? (
                <div>
                  <span className="font-bold">Effect </span>
                  <span>None</span>
                </div>
              ) : (
                <div>
                  <span className="font-bold pr-0.5">Effect </span>
                  <span>{buildings[buildingType].effect}</span>
                </div>
              )}
            </div>

            <div className="flex flex-row justify-between">
              <span>Tier {buildings[buildingType].tier}</span>
              <span>❤️{buildings[buildingType].currentHealth}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  */
