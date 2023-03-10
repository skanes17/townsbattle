import React from "react";
import { PostCombatBldgStatBox, PostCombatUnitsStatBox } from ".";
import { BaseUnit, Buildings, Unit, UnitCounts, UnitType } from "../../types/";
import { countUnits } from "../../utils";

interface PostCombatSummaryProps {
  BASE_UNIT_DATA: BaseUnit;
  buildings: Buildings;
  unitTypes: UnitType[];
  friendlyUnits: Unit[];
  enemyUnits: Unit[];
}

export default function PostCombatSummary({
  BASE_UNIT_DATA,
  buildings,
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
    <div className="relative h-full w-full self-center overflow-y-auto overflow-x-hidden rounded-md bg-gray-500/10 p-4 capitalize">
      <p className="sticky top-0 pb-2 text-center font-bold">Battle Summary</p>
      <p className="grid grid-rows-[1fr_1fr] gap-x-2 gap-y-6 lg:grid-cols-[1fr_1fr] xl:grid-cols-[1fr_1fr_1fr]">
        <PostCombatUnitsStatBox
          headerText="Enemies Defeated"
          headerTextColor="green"
          BASE_UNIT_DATA={BASE_UNIT_DATA}
          unitCounts={enemyUnitsDefeated}
          unitTypes={unitTypes}
        />

        <PostCombatUnitsStatBox
          headerText="Friendlies Injured"
          headerTextColor="amber"
          BASE_UNIT_DATA={BASE_UNIT_DATA}
          unitCounts={friendlyUnitsInjured}
          unitTypes={unitTypes}
        />

        <PostCombatUnitsStatBox
          headerText="Friendlies Lost"
          headerTextColor="red"
          BASE_UNIT_DATA={BASE_UNIT_DATA}
          unitCounts={friendlyUnitsDefeated}
          unitTypes={unitTypes}
        />

        <div className="border-t border-white/25 lg:col-span-2 xl:col-span-3">
          <PostCombatBldgStatBox
            headerText="Buildings Damaged"
            headerTextColor="blue"
            buildings={buildings}
          />
        </div>

        {/* <div className="grid auto-rows-min">
          <p>
            <span className="text-blue-500">Buildings Damaged</span>: 4
          </p>
          <p className="ml-2">Armorsmith</p>
          <p className="ml-2">Town Center</p>
          <p className="ml-2">Meal Hall</p>
          <p className="ml-2">Scouting Post</p>
        </div> */}
      </p>
    </div>
  );
}
