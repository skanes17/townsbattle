import React from "react";
import { BaseUnit } from "../types/BaseUnit";
import { UnitsInTraining } from "../types/UnitInTraining";

interface UnitInTrainingProps {
  BASE_UNIT_DATA: BaseUnit;
  unitType: "melee" | "pewpew" | "tanky";
  unitsInTraining: UnitsInTraining;
}

export default function UnitInTraining({
  BASE_UNIT_DATA,
  unitType,
  unitsInTraining,
}: UnitInTrainingProps) {
  {
    return (
      <div>
        {BASE_UNIT_DATA[unitType].nameSymbol} {unitsInTraining[unitType]}
      </div>
    );
  }
}
