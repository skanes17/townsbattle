import React from "react";
import { PostCombatStatBox } from ".";
import { BaseUnit, Unit, UnitCounts, UnitType } from "../../types/";
import { countUnits } from "../../utils";

interface PostCombatSummaryProps {
  BASE_UNIT_DATA: BaseUnit;
  unitTypes: UnitType[];
  friendlyUnits: Unit[];
  enemyUnits: Unit[];
}

export default function PostCombatSummary({
  BASE_UNIT_DATA,
  unitTypes,
  friendlyUnits,
  enemyUnits,
}: PostCombatSummaryProps) {
  const enemyUnitsDefeated = countUnits(enemyUnits, unitTypes, "defeated");
  // currently unused
  const enemyUnitsInjured: UnitCounts = countUnits(
    enemyUnits,
    unitTypes,
    "injured"
  );

  const friendlyUnitsInjured: UnitCounts = countUnits(
    friendlyUnits,
    unitTypes,
    "injured"
  );

  const friendlyUnitsDefeated = countUnits(
    friendlyUnits,
    unitTypes,
    "defeated"
  );

  return (
    <div className="aspect-[4/1] overflow-y-auto overflow-x-hidden rounded-md border-4 border-gray-500 bg-white/5 p-2 text-xs text-white shadow-md shadow-gray-500/50 sm:text-sm md:text-base lg:gap-1 lg:text-lg xl:text-2xl">
      <p className="pb-2 text-center font-bold">Battle Summary</p>
      <div className="grid auto-cols-auto grid-flow-col">
        <PostCombatStatBox
          headerText="Enemies Defeated"
          headerTextColor="green"
          BASE_UNIT_DATA={BASE_UNIT_DATA}
          unitCounts={enemyUnitsDefeated}
          unitTypes={unitTypes}
        />

        <PostCombatStatBox
          headerText="Friendlies Injured"
          headerTextColor="amber"
          BASE_UNIT_DATA={BASE_UNIT_DATA}
          unitCounts={friendlyUnitsInjured}
          unitTypes={unitTypes}
        />

        <PostCombatStatBox
          headerText="Friendlies Lost"
          headerTextColor="red"
          BASE_UNIT_DATA={BASE_UNIT_DATA}
          unitCounts={friendlyUnitsDefeated}
          unitTypes={unitTypes}
        />

        {/* FIXME: Make building stats dynamic as well */}
        <div className="grid auto-rows-min">
          {/* HEADER */}
          <p>
            <span className="text-blue-500">Buildings Damaged</span>: 4
          </p>
          <p className="ml-2">Armorsmith</p>
          <p className="ml-2">Town Center</p>
          <p className="ml-2">Meal Hall</p>
          <p className="ml-2">Scouting Post</p>
        </div>
      </div>
    </div>
  );
}
