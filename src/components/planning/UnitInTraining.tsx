import React from "react";
import { BaseUnitData, UnitCounts, UnitType } from "../../types";

interface UnitInTrainingProps {
  BASE_UNIT_DATA: BaseUnitData;
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
      {BASE_UNIT_DATA[unitType].symbol} {unitsInTraining[unitType]}
    </div>
  );
}
