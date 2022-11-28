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
    <div>
      <div className="font-bold">Army Size</div>
      {/* <div className="font-bold">Army Size: {armySize}</div> */}
      <div className="grid grid-flow-col gap-4 auto-cols-max">
        {/* TODO: <UnitCount /> three times? -- DRY! */}
        <div>🗡️ {unitCounts.melee}</div>
        <div>🏹 {unitCounts.pewpew}</div>
        <div>🛡️ {unitCounts.tanky}</div>
      </div>
    </div>
  );
}
