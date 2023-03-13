// @ts-nocheck
import React, { useState } from "react";
import { UnitCounts } from "../../types";

// TODO: Implement chance to hit? Could be upgraded?
// TODO: Implement armor? First x units get +1 health, etc
// TODO: Implement TRAITS?

export interface ArmyDetailsProps {
  friendlyUnits: Unit[];
  enemyUnits: Unit[];
  unitCounts: UnitCounts;
  enemyUnitCounts: UnitCounts;
}

export default function ArmyDetails({
  friendlyUnits,
  enemyUnits,
  unitCounts,
  enemyUnitCounts,
}: ArmyDetailsProps) {
  return (
    <div>
      <h2 className="text-4xl font-extrabold dark:text-white">Army Details</h2>
      <button
        onClick={() => {}}
        className="rounded bg-red-500 py-2 px-4 font-bold text-white hover:bg-red-700"
      >
        Fight!
      </button>
      <div>
        <div>
          <p>Your army size is {friendlyUnits.length}.</p>
          <p>
            {unitCounts.fighter} fighter, {unitCounts.archer} archer,{" "}
            {unitCounts.knight} knight.
          </p>
        </div>
        <div>
          <p>The enemy army has {enemyUnits.length} units.</p>
          <p>
            {enemyUnitCounts.fighter} fighter, {enemyUnitCounts.archer} archer,{" "}
            {enemyUnitCounts.knight} knight.
            {/* TODO: Make these percents? */}
          </p>
        </div>
      </div>
      <br></br>
    </div>
  );
}
