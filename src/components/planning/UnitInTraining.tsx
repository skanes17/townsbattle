import React from "react";
import { BaseUnit, UnitCounts, UnitType } from "../../types";

interface UnitInTrainingProps {
  BASE_UNIT_DATA: BaseUnit;
  unitType: UnitType;
  unitsInTraining: UnitCounts;
}

export default function UnitInTraining({
  BASE_UNIT_DATA,
  unitType,
  unitsInTraining,
}: UnitInTrainingProps) {
  return (
    <div className="hover:text-yellow-300 ">
      {BASE_UNIT_DATA[unitType].nameSymbol} {unitsInTraining[unitType]}
    </div>
  );
}
