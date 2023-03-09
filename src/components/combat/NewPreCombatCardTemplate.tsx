import React from "react";
import { enemyColor, friendlyColor } from "../../gameData";
import { ArmyColors, BaseUnit, Unit, UnitCounts, UnitType } from "../../types";

interface PreCombatCardTemplateProps {
  armyStyle: "friendly" | "enemy";
  headerText: "Your Army" | "Enemy Army";
  BASE_UNIT_DATA: BaseUnit;
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
      className={`flex flex-col items-center justify-center place-self-center overflow-y-auto overflow-x-hidden rounded-md border-4 align-middle sm:h-1/2 sm:w-28 md:h-3/5 md:w-[8.5rem] lg:h-4/5 lg:w-48 xl:h-full xl:w-60 ${borderColor} bg-white/5 p-2 text-white shadow-md ${shadowColor} text-xs sm:text-xs lg:text-2xl xl:text-3xl `}
    >
      <p className="font-bold">{headerText}</p>
      {/* // Extract into component with Army Grid in Planning */}
      <div className="grid auto-rows-min">
        {unitTypes.map((unitType) => {
          const bg = BASE_UNIT_DATA[unitType as UnitType].bgImageSm ?? ``;
          // only show unit types that were defeated
          return (
            unitCounts[unitType as UnitType as UnitType] > 0 && (
              <div className="mt-1 inline-flex capitalize">
                <div
                  className={`group mr-2 h-7 w-7 rounded-lg border border-zinc-700 group-hover:border-yellow-300 sm:h-8 sm:w-8 lg:h-9 lg:w-9 ${bg} bg-cover bg-center`}
                ></div>
                <span className="group-hover:text-yellow-300">
                  {unitCounts[unitType as UnitType]} {unitType}
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
