import React from "react";
import { Unit } from "../../types/Unit";

interface CombatCardHeader {
  unit: Unit;
}

export default function CombatCardHeader({ unit }: CombatCardHeader) {
  return (
    <div className={`col-span-3 self-center text-center font-bold`}>
      {unit.name}
      {unit.id}
    </div>
  );
}
