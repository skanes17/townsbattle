import React from "react";
import { BaseUnit, UnitCounts, UnitType } from "../../types";
import { UnitCount } from "../planning";
import DashboardImageAndCount from "../planning/DashboardImageAndCount";

interface DisplayUnitCountsProps {
  BASE_UNIT_DATA: BaseUnit;
  unitTypes: string[];
  unitCounts: UnitCounts;
}

export default function DisplayUnitCounts({
  BASE_UNIT_DATA,
  unitTypes,
  unitCounts,
}: DisplayUnitCountsProps) {
  return (
    <div className="m-1">
      <div className="text-center font-bold sm:text-sm md:text-base lg:text-lg">
        Army Size
      </div>
      <div className="grid auto-cols-max grid-flow-col justify-center gap-4 transition duration-75 ease-in-out md:text-lg lg:text-2xl">
        {unitTypes.map((unitType: string) => (
          <DashboardImageAndCount
            dataObject={BASE_UNIT_DATA}
            countsObject={unitCounts}
            type={unitType as UnitType}
          />
        ))}
      </div>
    </div>
  );
}
