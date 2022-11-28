// @ts-nocheck

import React from "react";
import townCenter from "../images/town-center.png";

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
    <div>
      <div className="font-bold">Buildings Constructed</div>
      <div className="flex">
        {constructedBuildings.map((buildingType) => (
          <div className="bg-white text-black w-48 p-2 rounded-md shadow-md flex flex-col items-center">
            <div className="p-0.5">{buildings[buildingType].name}</div>
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

            {/* TODO: How to get these spaced properly?? */}
            <div className="flex flex-row justify-between">
              <span>Tier {buildings[buildingType].tier}</span>
              {/* TODO: Replace number for health with heart symbols */}
              <span>❤️{buildings[buildingType].health}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
