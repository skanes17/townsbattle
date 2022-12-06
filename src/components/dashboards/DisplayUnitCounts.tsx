import React from "react";
import { BaseUnit } from "../../types/BaseUnit";
import { UnitCounts } from "../../types/UnitCounts";
import UnitCount from "../UnitCount";

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
  const armySize = unitCounts.melee + unitCounts.pewpew + unitCounts.tanky;

  return (
    <div className="m-1">
      <div className="font-bold sm:text-sm md:text-base lg:text-lg">
        Army Size
      </div>
      <div className="grid auto-cols-max grid-flow-col gap-4 transition duration-75 ease-in-out hover:text-yellow-300 md:text-lg lg:text-2xl">
        {unitTypes.map((unitType) => (
          <UnitCount
            BASE_UNIT_DATA={BASE_UNIT_DATA}
            /* @ts-ignore */
            unitType={unitType}
            unitCounts={unitCounts}
          />
        ))}
      </div>
    </div>
  );
}
