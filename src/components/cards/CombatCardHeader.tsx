import React from "react";
import { Unit } from "../../types/Unit";

interface CombatCardHeader {
  unit: Unit;
}

export default function CombatCardHeader({ unit }: CombatCardHeader) {
  const bossNameStyle =
    unit.unitType === "uwuu"
      ? "font-bold sm:font-extrabold text-red-400"
      : "font-semibold sm:font-bold";

  return (
    <div className={`${bossNameStyle} self-center text-center`}>
      {unit.randomName}
    </div>
  );
}
