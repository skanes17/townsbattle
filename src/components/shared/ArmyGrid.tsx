import React from "react";
import { Transition } from "@headlessui/react";
import { UnitTile } from ".";
import { Phases, Unit } from "../../types";

interface ArmyGridProps {
  gridStyle: "planning" | "combat";
  armyStyle: "friendly" | "enemy";
  phase?: Phases;
  army: Unit[];
  selectedUnit?: Unit;
}

export function ArmyGrid({
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

  /* TODO: Incorporate ltr-rtl flow of units in grids */
  /* let armyFlow;
  switch (armyStyle) {
    case "friendly":
      armyFlow = ``;
      break;
    case "enemy":
      armyFlow = ``;
      break;
    default:
      armyFlow = ``;
  } */

  return (
    /* TODO: Incorporate change in border color and opacity for win/lose state */
    /* TODO: Maybe add background image to grid */
    <div
      className={` ${style} relative grid h-full grid-flow-dense auto-rows-min grid-cols-[repeat(auto-fit,minmax(3.33rem,1fr))] justify-items-center gap-1 overflow-hidden rounded p-2 sm:grid-cols-[repeat(auto-fit,minmax(4rem,1fr))] md:grid-cols-[repeat(auto-fit,minmax(5rem,1fr))]`}
    >
      {army.length > 0 &&
        army.map((unit) => (
          <Transition
            key={`${unit.unitType}${unit.id}`}
            show={unit.currentHealth > 0}
            enter="transition-opacity ease-in-out duration-1000"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="transition-opacity ease-in-out duration-1000"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <UnitTile
              armyStyle={armyStyle}
              unit={unit}
              selectedUnit={selectedUnit}
              phase={phase}
            />
          </Transition>
        ))}
    </div>
  );
}
