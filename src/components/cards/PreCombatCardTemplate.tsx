import React from "react";
import { enemyColor, friendlyColor } from "../../gameData";
import { ArmyColors, BaseUnit, Unit, UnitCounts, UnitType } from "../../types";

interface PreCombatCardTemplateProps {
  color: ArmyColors;
  headerText: "Your Army" | "Enemy Army";
  BASE_UNIT_DATA: BaseUnit;
  army: Unit[];
  unitCounts: UnitCounts;
  unlockedUnitTypes: (UnitType | undefined)[];
}

export default function PreCombatCardTemplate({
  color,
  headerText,
  BASE_UNIT_DATA,
  army,
  unitCounts,
  unlockedUnitTypes,
}: PreCombatCardTemplateProps) {
  let borderColor, shadowColor;
  switch (color) {
    case friendlyColor:
      borderColor = "border-indigo-900";
      shadowColor = "shadow-indigo-500/50";
      break;
    case enemyColor:
      borderColor = "border-red-900";
      shadowColor = "shadow-red-500/50";
      break;
  }

  return (
    <div
      className={`grid h-full w-full auto-rows-auto grid-cols-1 place-items-center items-center gap-1 overflow-y-auto overflow-x-hidden rounded-md border-4 ${borderColor} bg-white/5 p-2 text-xs text-white shadow-md ${shadowColor} sm:text-xl md:text-2xl lg:text-3xl`}
    >
      <p className="text-sm font-bold sm:text-2xl md:text-3xl lg:text-4xl">
        {headerText}
      </p>
      {/* FIXME: Incorporate DRY for unlocked unit types */}
      {/* {Object.keys(unlockedUnitTypes).map((unitType) => {
        return (
          <p key={unitType} className="pl-2">
            {BASE_UNIT_DATA[unitType].symbol} {unitCounts[unitType]}{" "}
            {unitType}
          </p>
        );
      })} */}
      <p className="pl-2">⚔️ {unitCounts.fighter} fighter</p>
      <p className="pl-2">🏹 {unitCounts.archer} archer</p>
      <p className="pl-2">🛡️ {unitCounts.knight} knight</p>
      <p className="pl-2 opacity-50">
        ({unitCounts.fighter + unitCounts.archer + unitCounts.knight} total)
      </p>
    </div>
  );
}
