import React from "react";
import { Phase, Phases } from "../../types/CombatPhases";
import { Unit } from "../../types/Unit";
import UnitTile from "./UnitTile";

interface ArmyGridProps {
  phase: Phases;
  army: Unit[];
  selectedUnit: Unit;
  startColumn: "1" | "8";
}

export default function ArmyGrid({
  phase,
  army,
  selectedUnit,
  startColumn,
}: ArmyGridProps) {
  let colStart;
  if (startColumn === "1") {
    colStart = "col-start-1";
  }
  if (startColumn === "8") {
    colStart = "col-start-8";
  }

  return (
    /* could use w-full instead of w-fit here if you want more gaps */
    /* TODO: Incorporate change in border color and opacity for win/lose state */
    /* FIXME: Grid collapsing when empty */
    <div
      className={`col-span-5 ${colStart} row-span-2 row-start-2 mx-auto grid h-full max-h-48 w-fit max-w-sm snap-y auto-rows-min grid-cols-3 gap-1 self-center overflow-y-auto overflow-x-hidden rounded border border-indigo-900/50 bg-blue-500/5 sm:col-span-4 sm:row-start-1 sm:aspect-square sm:max-h-full md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6`}
    >
      {army.map((unit) => (
        <UnitTile unit={unit} selectedUnit={selectedUnit} phase={phase} />
      ))}
    </div>
  );
}
