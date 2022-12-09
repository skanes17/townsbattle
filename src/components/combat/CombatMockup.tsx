import React from "react";

/* TODO: Figure out how to place friendly divs in grid form, enemies start from top right */

export default function CombatMockup() {
  return (
    <div className="grid grid-cols-5 justify-between gap-2 p-4">
      <div className="col-span-2 grid grid-flow-row auto-rows-max grid-cols-10 justify-self-start">
        <div>M</div>
        <div>P</div>
        <div>M</div>
        <div>M</div>
        <div>T</div>
      </div>
      <div className="justify-self-center">Log</div>
      <div className="col-span-2 grid grid-flow-row auto-rows-max grid-cols-10 justify-self-end">
        <div>M</div>
        <div>P</div>
        <div>M</div>
        <div>M</div>
        <div>T</div>
      </div>
    </div>
  );
}
