import React from "react";
import { baseUnitData, enemyColor, friendlyColor } from "../../gameData";
import {
  ArmyColors,
  BaseUnitData,
  Unit,
  UnitCounts,
  UnitType,
} from "../../types";

interface PreCombatCardTemplateProps {
  armyStyle: "friendly" | "enemy";
  headerText: "Your Army" | "Enemy Army";
  BASE_UNIT_DATA: BaseUnitData;
  army: Unit[];
  unitCounts: UnitCounts;
  unitTypes: UnitType[];
}

export default function PreCombatCardTemplate({
  armyStyle,
  headerText,
  BASE_UNIT_DATA,
  army,
  unitCounts,
  unitTypes,
}: PreCombatCardTemplateProps) {
  let borderColor, shadowColor, placeSelfStartOrEnd;
  switch (armyStyle) {
    case "friendly":
      borderColor = "border-indigo-900";
      shadowColor = "shadow-indigo-500/50";
      break;
    case "enemy":
      borderColor = "border-red-900";
      shadowColor = "shadow-red-500/50";
      break;
  }

  return (
    <div
      className={`flex h-full w-16 flex-col items-center justify-center place-self-center overflow-y-auto overflow-x-hidden align-middle sm:h-1/2 sm:w-28 md:h-3/5 md:w-[8.5rem] lg:h-4/5 lg:w-48 xl:h-full xl:w-60 ${borderColor} rounded-lg border-4 bg-white/5 p-0 text-white shadow-md sm:p-2 ${shadowColor} text-xs lg:text-xl xl:text-2xl`}
    >
      <p className="font-bold">{headerText}</p>
      {/* // Extract into component with Army Grid in Planning */}
      <div className="grid auto-rows-min">
        {unitTypes.map((unitType) => {
          const bg = BASE_UNIT_DATA[unitType as UnitType].bgImageSm ?? ``;
          // only show unit types that were defeated
          return (
            unitCounts[unitType as UnitType as UnitType] > 0 && (
              <div
                key={unitType}
                className="mt-1 inline-flex flex-wrap capitalize sm:flex-nowrap"
              >
                <div
                  className={`group mr-2 h-7 w-7 rounded-lg border border-zinc-700 sm:h-8 sm:w-8 lg:h-9 lg:w-9 ${bg} bg-cover bg-center`}
                ></div>
                <span>
                  {unitCounts[unitType as UnitType]}{" "}
                  {baseUnitData[unitType as UnitType].name}
                  {unitCounts[unitType as UnitType] > 1 && `s`}
                </span>
              </div>
            )
          );
        })}
      </div>
    </div>
  );
}
