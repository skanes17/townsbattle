import React from "react";
import { enemyColor, friendlyColor } from "../../gameData";
import { ArmyColors } from "../../types";
import { SubPhases } from "../../types/CombatPhases";
import { Unit } from "../../types/Unit";
import { CombatCardFooter, CombatCardHeader, CombatCardSymbol } from "../cards";

interface CombatCardTemplateProps {
  color: ArmyColors;
  unit: Unit;
  subphase: SubPhases;
}

export default function CombatCardTemplate({
  color,
  unit,
  subphase,
}: CombatCardTemplateProps) {
  let fightAnimation;
  if (subphase === SubPhases.VictoryCheck) {
    fightAnimation = "animate-[jiggleRight 0.25s linear 1]";
  }

  let borderColor;
  switch (color) {
    case friendlyColor:
      borderColor = "border-indigo-900";
      break;
    case enemyColor:
      borderColor = "border-red-900";
      break;
  }

  /* TODO: Make animations work */
  return (
    <div
      className={`${fightAnimation} grid h-full w-full auto-rows-auto grid-cols-3 gap-1 rounded-md border-4 ${borderColor} bg-white/5 p-2 text-white shadow-md shadow-gray-500/50`}
    >
      <CombatCardHeader unit={unit} />
      <CombatCardSymbol unit={unit} />
      <CombatCardFooter unit={unit} />
    </div>
  );
}
