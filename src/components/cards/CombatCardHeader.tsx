import React from "react";
import { Unit } from "../../types/Unit";

interface CombatCardHeader {
  unit: Unit;
}

export default function CombatCardHeader({ unit }: CombatCardHeader) {
  return (
    <div
      className={`col-span-3 self-center text-center text-base font-bold sm:text-3xl md:text-4xl lg:text-5xl`}
    >
      {unit.name}
      {unit.id}
    </div>
  );
}
