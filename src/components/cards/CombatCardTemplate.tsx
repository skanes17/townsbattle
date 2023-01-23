import React from "react";
import { SubPhases } from "../../types/CombatPhases";
import { Unit } from "../../types/Unit";
import { CombatCardFooter, CombatCardHeader, CombatCardSymbol } from "../cards";

interface CombatCardTemplateProps {
  unit: Unit;
  subphase: SubPhases;
}

export default function CombatCardTemplate({
  unit,
  subphase,
}: CombatCardTemplateProps) {
  let fightAnimation;
  if (subphase === SubPhases.VictoryCheck) {
    fightAnimation = "animate-[jiggleRight 0.25s linear 1]";
  }

  /* TODO: Make animations work */
  return (
    <div
      className={`${fightAnimation} grid h-full w-full auto-rows-auto grid-cols-3 gap-1 rounded-md border-4 border-blue-900 bg-white/5 p-2 text-white shadow-md shadow-gray-500/50`}
    >
      <CombatCardHeader unit={unit} />
      <CombatCardSymbol unit={unit} />
      <CombatCardFooter unit={unit} />
    </div>
  );
}
