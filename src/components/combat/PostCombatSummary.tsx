import React from "react";
import { Unit, UnitCounts, UnitType } from "../../types/";
import { countUnits } from "../../utils";

interface PostCombatSummaryProps {
  unitTypes: UnitType[];
  friendlyUnits: Unit[];
  enemyUnits: Unit[];
}

export default function PostCombatSummary({
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
    /* FIXME: Having to define rows!! */
    /* TODO: Once rows are auto-generated, use a list here and make all sections DRY using props */
    <div className="grid aspect-[4/1] auto-rows-min grid-cols-4 overflow-y-auto overflow-x-hidden rounded-md border-4 border-gray-500 bg-white/5 p-2 text-xs text-white shadow-md shadow-gray-500/50 sm:text-sm md:text-base lg:gap-1 lg:text-lg xl:text-2xl">
      <p className="col-span-4 text-center font-bold">Battle Summary</p>
      <p className="col-start-1 row-start-2">
        <span className="text-green-500">Enemies Defeated</span>:{" "}
        {enemyUnitsDefeated.total}
      </p>
      {/* FIXME: Undefined catch here */}
      <p className="col-start-1 row-start-3 ml-2 ">
        {enemyUnitsDefeated.melee} melee (
        {Math.round(
          (enemyUnitsDefeated.melee / enemyUnitsDefeated.total) * 100
        )}
        %)
      </p>
      <p className="col-start-1 row-start-4 ml-2 ">
        {enemyUnitsDefeated.pewpew} pewpew (
        {Math.round(
          (enemyUnitsDefeated.pewpew / enemyUnitsDefeated.total) * 100
        )}
        %)
      </p>
      <p className="col-start-1 row-start-5 ml-2 ">
        {enemyUnitsDefeated.tanky} tanky (
        {Math.round(
          (enemyUnitsDefeated.tanky / enemyUnitsDefeated.total) * 100
        )}
        %)
      </p>
      {/* FIXME: Bug with friendly calculation */}
      <p className="col-start-2 row-start-2">
        <span className="text-amber-500">Friendlies injured: </span>
        {friendlyUnitsInjured.total}
      </p>
      {friendlyUnitsInjured.total === 0 ? null : (
        <>
          <p className="col-start-2 row-start-3 ml-2 ">
            {friendlyUnitsInjured.melee} melee (
            {Math.round(
              (friendlyUnitsInjured.melee / friendlyUnitsInjured.total) * 100
            )}
            %)
          </p>
          <p className="col-start-2 row-start-4 ml-2 ">
            {friendlyUnitsInjured.pewpew} pewpew (
            {Math.round(
              (friendlyUnitsInjured.pewpew / friendlyUnitsInjured.total) * 100
            )}
            %)
          </p>
          <p className="col-start-2 row-start-5 ml-2 ">
            {friendlyUnitsInjured.tanky} tanky (
            {Math.round(
              (friendlyUnitsInjured.tanky / friendlyUnitsInjured.total) * 100
            )}
            %)
          </p>
        </>
      )}

      <p className="col-start-3 row-start-2">
        <span className="text-red-500">Friendlies Lost: </span>{" "}
        {friendlyUnitsDefeated.total}
      </p>
      <p className="col-start-3 row-start-3 ml-2 ">
        {friendlyUnitsDefeated.melee} melee (
        {Math.round(
          (friendlyUnitsDefeated.melee / friendlyUnitsDefeated.total) * 100
        )}
        %)
      </p>
      <p className="col-start-3 row-start-4 ml-2 ">
        {friendlyUnitsDefeated.pewpew} pewpew (
        {Math.round(
          (friendlyUnitsDefeated.pewpew / friendlyUnitsDefeated.total) * 100
        )}
        %)
      </p>
      <p className="col-start-3 row-start-5 ml-2 ">
        {friendlyUnitsDefeated.tanky} tanky (
        {Math.round(
          (friendlyUnitsDefeated.tanky / friendlyUnitsDefeated.total) * 100
        )}
        %)
      </p>
      <p className="col-start-4 row-start-2">
        <span className="text-red-500">Buildings damaged: </span>4
      </p>
      <p className="col-start-4 row-start-3 ml-2">Armorsmith</p>
      <p className="col-start-4 row-start-4 ml-2">Town Center</p>
      <p className="col-start-4 row-start-5 ml-2">Meal Hall</p>
      <p className="col-start-4 row-start-6 ml-2">Scouting Post</p>
    </div>
  );
}
