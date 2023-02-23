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
  return (
    <div className="hover:text-yellow-300 ">
      {BASE_UNIT_DATA[unitType].symbol} {unitCounts[unitType]}
    </div>
  );
}
