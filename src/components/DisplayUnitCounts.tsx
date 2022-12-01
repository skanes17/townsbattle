import React from "react";
import { UnitCounts } from "../types/UnitCounts";

interface DisplayUnitCountsProps {
  unitCounts: UnitCounts;
}

export default function DisplayUnitCounts({
  unitCounts,
}: DisplayUnitCountsProps) {
  const armySize = unitCounts.melee + unitCounts.pewpew + unitCounts.tanky;

  return (
    <div className="m-1">
      <div className="font-bold sm:text-sm md:text-base lg:text-lg">
        Army Size
      </div>
      <div className="grid auto-cols-max grid-flow-col gap-4 transition ease-in-out hover:scale-105 hover:text-yellow-300 md:text-lg lg:text-2xl">
        {/* TODO: <UnitCount /> three times? -- DRY! */}
        <div>🗡️ {unitCounts.melee}</div>
        <div>🏹 {unitCounts.pewpew}</div>
        <div>🛡️ {unitCounts.tanky}</div>
      </div>
    </div>
  );
}
