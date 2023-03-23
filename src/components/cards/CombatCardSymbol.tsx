import React from "react";
import { Unit } from "../../types/Unit";

interface CombatCardSymbolProps {
  unit: Unit;
}

export default function CombatCardSymbol({ unit }: CombatCardSymbolProps) {
  return (
    <div
      className={`col-span-3 items-center self-center text-center text-4xl font-bold sm:text-8xl md:text-9xl lg:text-[10rem]`}
    >
      {unit.currentHealth === 0 ? (
        <span className="font-emoji">💀</span>
      ) : (
        <span className="font-emoji" title={`${unit.name}`}>
          {unit.symbol}
        </span>
      )}
    </div>
  );
}
