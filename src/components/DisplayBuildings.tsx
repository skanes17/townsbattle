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
      <div className="flex space-x-2">
        {constructedBuildings.map((buildingType) => (
          <div className="bg-white text-black w-52 h-72 border-4 border-blue-900 rounded-md shadow-md shadow-gray-500/50 grid grid-cols-3 gap-1">
            <div className="flex justify-center items-center h-8 bg-indigo-200 text-lg font-bold mx-2 rounded-b-md col-span-3">
              {buildings[buildingType].name}
            </div>
            <div className="flex justify-center items-center h-16 col-span-3">
              <img
                className="mx-auto w-16 h-16"
                src={townCenter}
                alt={`building`}
              />
            </div>
            <div className="mx-4 p-1 h-28 shadow-sm bg-amber-100 border-slate-300 rounded-sm col-span-3">
              {buildings[buildingType].effect === "" ? (
                <>
                  <span className="font-bold">Effect </span>
                  <span>None</span>
                </>
              ) : (
                <>
                  <span className="font-bold pr-0.5">Effect </span>
                  <span>{buildings[buildingType].effect}</span>
                </>
              )}
            </div>

            {/* TODO: How to get these spaced properly?? */}

            <div></div>
            <div className="bg-slate-800 text-md mt-4 px-1 rounded-t-lg text-white justify-self-center place-self-end">
              Tier {buildings[buildingType].tier}
            </div>
            {/* TODO: Replace number for health with heart symbols */}
            <div className="bg-slate-800 text-md mt-4 px-1 rounded-tl-lg text-white place-self-end">
              ❤️{buildings[buildingType].health}
            </div>
          </div>
        ))}
      </div>
    </div>
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
              <span>❤️{buildings[buildingType].health}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  */
