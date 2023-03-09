import React from "react";
import { Phase, Phases, Unit } from "../../types";
import UnitTile from "./UnitTile";

interface ArmyGridProps {
  color?: "blue" | "red";
  phase?: Phases;
  army: Unit[];
  selectedUnit?: Unit;
  startColumn?: "1" | "8";
}

export default function ArmyGrid({
  color,
  phase,
  army,
  selectedUnit,
  startColumn,
}: ArmyGridProps) {
  let borderColor, bgColor;
  switch (color) {
    case "blue":
      borderColor = "border border-indigo-900/50";
      bgColor = "bg-indigo-500/5";
      break;
    case "red":
      borderColor = "border border-red-900/50";
      bgColor = "bg-red-500/5";
      break;
    default:
      borderColor = ``;
      bgColor = ``;
  }

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
    /* TODO: Maybe add background image to grid */
    <div
      className={`relative grid w-4/5 grid-flow-dense grid-cols-[repeat(auto-fit,minmax(3.33rem,1fr))] justify-items-center gap-1 overflow-hidden rounded p-2 sm:grid-cols-[repeat(auto-fit,minmax(4rem,1fr))] md:grid-cols-[repeat(auto-fit,minmax(5rem,1fr))] ${borderColor} ${bgColor}`}
    >
      {army.map((unit) => (
        <UnitTile unit={unit} selectedUnit={selectedUnit} phase={phase} />
      ))}
    </div>
  );
}
