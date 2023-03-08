import React from "react";
import { BaseUnit, UnitCounts, UnitType } from "../../types";

interface UnitCountProps {
  BASE_UNIT_DATA: BaseUnit;
  unitType: UnitType;
  unitCounts: UnitCounts;
}

export default function UnitCount({
  BASE_UNIT_DATA,
  unitType,
  unitCounts,
}: UnitCountProps) {
  let bg = BASE_UNIT_DATA[unitType].bgImageSm;

  return (
    <div className="group flex h-8 flex-row align-middle hover:text-yellow-300">
      <div
        className={`mr-2 h-8 w-8 rounded-lg border border-zinc-700 group-hover:border-yellow-300 ${bg} bg-cover bg-center`}
      ></div>
      <div className="text-right group-hover:text-yellow-300">
        {unitCounts[unitType]}
      </div>
    </div>
  );
}
