import React from "react";
import { BaseUnit, UnitCounts } from "../../types";

interface UnitCountProps {
  BASE_UNIT_DATA: BaseUnit;
  unitType: "melee" | "pewpew" | "tanky";
  unitCounts: UnitCounts;
}

export default function UnitCount({
  BASE_UNIT_DATA,
  unitType,
  unitCounts,
}: UnitCountProps) {
  return (
    <div className="hover:text-yellow-300 ">
      {BASE_UNIT_DATA[unitType].nameSymbol} {unitCounts[unitType]}
    </div>
  );
}
