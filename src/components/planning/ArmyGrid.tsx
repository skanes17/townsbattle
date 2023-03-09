import React from "react";
import { Phase, Phases, Unit } from "../../types";
import UnitTile from "./UnitTile";

interface ArmyGridProps {
  gridStyle: "planning" | "combat";
  armyStyle: "friendly" | "enemy";
  phase?: Phases;
  army: Unit[];
  selectedUnit?: Unit;
}

export default function ArmyGrid({
  gridStyle,
  armyStyle,
  phase,
  army,
  selectedUnit,
}: ArmyGridProps) {
  let style;
  switch (gridStyle) {
    case "planning":
      style = `w-4/5`;
      break;
    case "combat":
      style = `w-full overflow-y-auto`;
      break;
    default:
      style = `w-4/5`;
  }

  let armyFlow;
  switch (armyStyle) {
    case "friendly":
      armyFlow = ``;
      break;
    case "enemy":
      armyFlow = ``;
      break;
    default:
      armyFlow = ``;
  }

  return (
    /* could use w-full instead of w-fit here if you want more gaps */
    /* TODO: Incorporate change in border color and opacity for win/lose state */
    /* FIXME: Grid collapsing when empty */
    /* TODO: Maybe add background image to grid */
    <div
      className={` ${style} relative grid h-full grid-flow-dense grid-cols-[repeat(auto-fit,minmax(3.33rem,1fr))] justify-items-center gap-1 overflow-hidden rounded p-2 sm:grid-cols-[repeat(auto-fit,minmax(4rem,1fr))] md:grid-cols-[repeat(auto-fit,minmax(5rem,1fr))]`}
    >
      {army.map((unit) => (
        <UnitTile
          armyStyle={armyStyle}
          unit={unit}
          selectedUnit={selectedUnit}
          phase={phase}
        />
      ))}
    </div>
  );
}
