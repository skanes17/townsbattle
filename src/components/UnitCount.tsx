import React from "react";
import { BaseUnit } from "../types/BaseUnit";
import { UnitCounts } from "../types/UnitCounts";

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
  {
    return (
      <div>
        {BASE_UNIT_DATA[unitType].nameSymbol} {unitCounts[unitType]}
      </div>
    );
  }
}
