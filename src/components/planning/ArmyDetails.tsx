// @ts-nocheck
import React, { useState } from "react";
import { UnitCounts } from "../../types";

// TODO: Implement chance to hit? Could be upgraded?
// TODO: Implement armor? First x units get +1 health, etc
// TODO: Implement TRAITS?

export interface ArmyDetailsProps {
  myUnits: Unit[];
  enemyUnits: Unit[];
  unitBattler: any;
  unitCounts: UnitCounts;
  enemyUnitCounts: UnitCounts;
}

export default function ArmyDetails({
  myUnits,
  enemyUnits,
  unitBattler,
  unitCounts,
  enemyUnitCounts,
}: ArmyDetailsProps) {
  return (
    <div>
      <h2 className="text-4xl font-extrabold dark:text-white">Army Details</h2>
      <button
        onClick={unitBattler}
        className="rounded bg-red-500 py-2 px-4 font-bold text-white hover:bg-red-700"
      >
        Fight!
      </button>
      <div>
        <div>
          <p>Your army size is {myUnits.length}.</p>
          <p>
            {unitCounts.melee} melee, {unitCounts.pewpew} pewpew,{" "}
            {unitCounts.tanky} tanky.
          </p>
        </div>
        <div>
          <p>The enemy army has {enemyUnits.length} units.</p>
          <p>
            {enemyUnitCounts.melee} melee, {enemyUnitCounts.pewpew} pewpew,{" "}
            {enemyUnitCounts.tanky} tanky.
            {/* TODO: Make these percents? */}
          </p>
        </div>
      </div>
      <br></br>
    </div>
  );
}
