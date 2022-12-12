import { util } from "prettier";
import React from "react";
import { Unit } from "../../types/Unit";

interface UnitTile {
  unit: Unit;
}

export default function UnitTile({ unit }: UnitTile) {
  const percentHealth = (unit.currentHealth / unit.maxHealth) * 100;

  return (
    <>
      <div className="square group relative my-auto mx-auto max-w-min justify-items-center rounded-md border-2 border-white/20 p-1 text-center shadow-inner hover:border-orange-300/80">
        <div className="pb-1 text-xl sm:text-3xl md:text-3xl lg:text-3xl xl:text-3xl">
          {unit.nameSymbol}
        </div>
        {/* TODO: Determine healthbar size and color from current health */}
        {/* TODO: Match hover color with health status eg. red for hurtin */}
        <div
          className={`h-2 w-[${percentHealth}%] rounded-sm bg-orange-400`}
        ></div>
        <span className="pointer-events-none absolute top-16 left-1/2 z-50 -translate-x-1/2 whitespace-nowrap rounded bg-black/80 px-2 py-1 text-center text-xs text-white opacity-0 before:absolute before:border-transparent before:border-t-black group-hover:opacity-100 sm:text-xs lg:text-sm xl:text-sm">
          {/* TODO: Add space for randomly generated name */}
          <div>Test Unit</div>
          <div>
            {unit.name}_{unit.id}
          </div>
          <div>Attack: {unit.attack}</div>
          <div>
            HP: {unit.currentHealth}/{unit.maxHealth}
          </div>
        </span>
      </div>
    </>
  );
}

/* 
unitType: UnitType;
  name: "Melee" | "Pewpew" | "Tanky";
  nameSymbol: "⚔️" | "🏹" | "🛡️";
  description?: string;
  attack: number;
  maxHealth: number;
  currentHealth: number;
  id?: number;
*/
