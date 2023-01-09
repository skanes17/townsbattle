import React from "react";
import { BaseUnit } from "../../types/BaseUnit";
import { UnitCounts } from "../../types/UnitCounts";
import UnitInTraining from "../planning/UnitInTraining";

interface DisplayTrainingProps {
  BASE_UNIT_DATA: BaseUnit;
  unitTypes: string[];
  unitsInTraining: UnitCounts;
}

export default function DisplayTraining({
  BASE_UNIT_DATA,
  unitTypes,
  unitsInTraining,
}: DisplayTrainingProps) {
  return (
    <div className="m-1">
      <div className="text-center font-bold sm:text-sm md:text-base lg:text-lg">
        Units in Training
      </div>
      <div className="grid auto-cols-max grid-flow-col justify-center gap-4 transition duration-75 ease-in-out md:text-lg lg:text-2xl">
        {unitTypes.map((unitType) => (
          <UnitInTraining
            BASE_UNIT_DATA={BASE_UNIT_DATA}
            /* @ts-ignore */
            unitType={unitType}
            unitsInTraining={unitsInTraining}
          />
        ))}
      </div>
    </div>
  );
}
