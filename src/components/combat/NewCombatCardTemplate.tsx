import React from "react";
import { enemyColor, friendlyColor } from "../../gameData";
import { ArmyColors } from "../../types";
import { SubPhases } from "../../types/CombatPhases";
import { Unit } from "../../types/Unit";
import { CombatCardFooter, CombatCardHeader, CombatCardSymbol } from "../cards";
import CardBgWithImage from "../cards/CardBgWithImage";

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

  let borderColor, shadowColor;
  switch (color) {
    case friendlyColor:
      borderColor = "border-indigo-900";
      shadowColor = "shadow-indigo-500/50";
      break;
    case enemyColor:
      borderColor = "border-red-900";
      shadowColor = "shadow-red-500/50";
      break;
  }

  /* TODO: Make animations work */
  return (
    <div
      className={`${
        fightAnimation ?? ``
      } grid grid-rows-[1fr_3fr_1.5fr] place-items-center items-center justify-center overflow-y-auto overflow-x-hidden rounded-md border-4 align-middle sm:h-1/2 sm:w-28 md:h-3/5 md:w-[8.5rem] lg:h-4/5 lg:w-48 xl:h-full xl:w-60 ${borderColor} bg-white/5 p-2 text-white shadow-md ${shadowColor} text-xs sm:text-sm lg:text-3xl xl:text-4xl`}
    >
      <CombatCardHeader unit={unit} />
      <CardBgWithImage
        cardStyle="combat"
        saturation="oversaturated"
        bgImage={unit.bgImageMd}
      />
      {/* <CombatCardSymbol unit={unit} /> */}
      <CombatCardFooter unit={unit} />
    </div>
  );
}
