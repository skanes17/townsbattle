import React from "react";
import { enemyColor, friendlyColor } from "../../gameData";
import { ArmyColors } from "../../types";
import { SubPhases } from "../../types/CombatPhases";
import { Unit } from "../../types/Unit";
import CardBgWithImage from "./CardBgWithImage";
import CombatCardFooter from "./CombatCardFooter";
import CombatCardHeader from "./CombatCardHeader";

interface CombatCardTemplateProps {
  armyStyle: "friendly" | "enemy";
  unit: Unit;
  subphase: SubPhases;
}

export default function CombatCardTemplate({
  armyStyle,
  unit,
  subphase,
}: CombatCardTemplateProps) {
  let fightAnimation;
  if (subphase === SubPhases.VictoryCheck) {
    fightAnimation = "animate-[jiggleRight 0.25s linear 1]";
  }

  let borderColor, shadowColor;
  switch (armyStyle) {
    case "friendly":
      borderColor = "border-indigo-900";
      shadowColor = "shadow-indigo-500/50";
      break;
    case "enemy":
      borderColor = "border-red-900";
      shadowColor = "shadow-red-500/50";
      break;
  }

  /* TODO: Make animations work */
  return (
    <div
      className={`${fightAnimation ?? ``} ${borderColor}
      ${shadowColor} grid w-16 grid-rows-[1fr_3fr_1.5fr] place-items-center justify-center place-self-center overflow-x-hidden rounded-md border-4 bg-white/5 p-0 align-middle text-[0.66rem] text-white shadow-md sm:h-1/2 sm:w-28 sm:p-2 sm:text-sm md:h-3/5 md:w-[8.5rem] lg:h-4/5 lg:w-48 lg:text-3xl xl:h-full xl:w-60`}
    >
      <CombatCardHeader unit={unit} />
      <CardBgWithImage
        cardStyle="combat"
        saturation="oversaturated"
        bgImage={unit.bgImageMd}
        unit={unit}
      />
      {/* <CombatCardSymbol unit={unit} /> */}
      <CombatCardFooter unit={unit} />
    </div>
  );
}
