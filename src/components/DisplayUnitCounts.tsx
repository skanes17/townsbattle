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
    <div className="m-auto text-center">
      <div className="font-bold lg:text-lg md:text-base sm:text-sm">
        Army Size
      </div>
      <div className="transition ease-in-out hover:scale-105 hover:text-yellow-300 grid lg:text-2xl md:text-lg grid-flow-col gap-4 auto-cols-max">
        {/* TODO: <UnitCount /> three times? -- DRY! */}
        <div>🗡️ {unitCounts.melee}</div>
        <div>🏹 {unitCounts.pewpew}</div>
        <div>🛡️ {unitCounts.tanky}</div>
      </div>
    </div>
  );
}
