import React from "react";
import { Unit } from "../../types/Unit";
import UnitCount from "../UnitCount";

interface CombatCardSymbolProps {
  unit: Unit;
}

export default function CombatCardSymbol({ unit }: CombatCardSymbolProps) {
  return (
    <div
      className={`col-span-3 items-center self-center text-center text-4xl font-bold sm:text-8xl md:text-9xl lg:text-[10rem]`}
    >
      {unit.nameSymbol}
    </div>
  );
}
