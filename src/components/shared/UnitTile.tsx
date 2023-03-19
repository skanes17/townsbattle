import React from "react";
import { Phases, Unit } from "../../types";
import {
  AttackValueType,
  calculatedAttackValue,
  generateStars,
} from "../../utils";
import { allAttackBonusesCheck } from "../../utils/attackBonusCheck";

interface UnitTileProps {
  armyStyle: "friendly" | "enemy";
  unit: Unit;
  selectedUnit?: Unit;
  phase?: Phases;
}

export function UnitTile({
  armyStyle,
  unit,
  selectedUnit,
  phase,
}: UnitTileProps) {
  const {
    bgImageMd,
    currentHealth,
    maxHealth,
    name,
    randomName,
    id,
    attack,
    berserkerAttackMultiplier,
    fullHealthAttackBonus,
    armor,
  } = unit;

  let healthWidth,
    healthBarColor,
    hoverBorder,
    borderWidth,
    borderColor,
    bgColor;

  const bg = bgImageMd ?? ``;

  const percentHealth = (currentHealth / maxHealth) * 100;

  if (percentHealth === 0) {
    healthWidth = "w-0";
  } else if (percentHealth <= 5) {
    healthWidth = "w-[5%]";
  } else if (percentHealth <= 10) {
    healthWidth = "w-[10%]";
  } else if (percentHealth <= 20) {
    healthWidth = "w-[20%]";
  } else if (percentHealth <= 30) {
    healthWidth = "w-[30%]";
  } else if (percentHealth <= 40) {
    healthWidth = "w-[40%]";
  } else if (percentHealth <= 50) {
    healthWidth = "w-[50%]";
  } else if (percentHealth <= 60) {
    healthWidth = "w-[60%]";
  } else if (percentHealth <= 70) {
    healthWidth = "w-[70%]";
  } else if (percentHealth <= 80) {
    healthWidth = "w-[80%]";
  } else if (percentHealth <= 90) {
    healthWidth = "w-[90%]";
  } else if (percentHealth < 100) {
    healthWidth = "w-[95%]";
  } else healthWidth = "w-[100%]";

  if (percentHealth <= 25) {
    healthBarColor = "bg-red-700";
    hoverBorder =
      "hover:border-red-800/100 hover:shadow hover:shadow-red-500/75";
  } else if (percentHealth <= 50) {
    healthBarColor = "bg-red-400";
    hoverBorder =
      "hover:border-red-500/100 hover:shadow hover:shadow-red-500/75";
  } else if (percentHealth <= 75) {
    healthBarColor = "bg-orange-400";
    hoverBorder =
      "hover:border-orange-500/100 hover:shadow hover:shadow-orange-500/75";
  } else {
    healthBarColor = "bg-green-400";
    hoverBorder =
      "hover:border-green-500/100 hover:shadow hover:shadow-green-500/75";
  }

  let healthBarBackgroundColor = /* currentHealth > 0 ?  */ `bg-black/80`; /*  : `bg-red-500/40` */

  if (phase === Phases.Combat && unit === selectedUnit) {
    borderWidth = "border-2";
    switch (armyStyle) {
      case "friendly":
        borderColor = "border-indigo-400/80 shadow-sm shadow-indigo-500";
        break;
      case "enemy":
        borderColor = "border-red-400/80 shadow-sm shadow-red-500";
        break;
    }
  } else {
    borderWidth = "border-2";
    borderColor = "border-zinc-700";
  }

  // if the unit dies, give a red overlay
  if (currentHealth === 0) {
    bgColor = "bg-red-700/20";
  }

  const totalAttackValue = calculatedAttackValue(AttackValueType.card, unit);

  const starDisplay = generateStars(unit.combatsSurvived);

  return (
    <>
      <div
        key={`${name}${id}`}
        className={`${bg} group relative h-20 w-[3.33rem] snap-start justify-items-center rounded-lg bg-cover bg-center saturate-125 sm:h-24 sm:w-[4rem] md:h-[7.5rem] md:w-20 ${bgColor} ${borderWidth} ${borderColor} p-1 text-center shadow-inner ${hoverBorder}`}
      >
        <div
          className={`absolute left-0 right-0 bottom-[2.5%] mx-auto h-2 w-[95%] rounded-sm ${healthBarBackgroundColor} backdrop-blur-[1px] transition-all duration-500 ease-out md:h-3`}
        >
          <div
            className={`h-2 md:h-3 ${healthWidth} ${healthBarColor} rounded-sm transition-all duration-500 ease-out`}
          ></div>
        </div>
        <div className="absolute left-0 bottom-0 mx-auto w-full -translate-y-full bg-zinc-800/80 text-center text-xs">
          {starDisplay}
        </div>
        {/* Popup text */}
        <div className="fixed inset-0 flex h-[90%] w-[140%] translate-y-[5%] -translate-x-[20%] flex-col justify-center overflow-y-auto overflow-x-hidden rounded-lg bg-black/80 text-center text-xs text-white opacity-0 group-hover:opacity-100 sm:text-base">
          {randomName && <p>{randomName + id}</p>}
          {allAttackBonusesCheck(unit) ? (
            <p className="font-semibold text-amber-400">🗡️{totalAttackValue}</p>
          ) : (
            <div className="group/attack relative">
              <p>🗡️{totalAttackValue}</p>
              <p className="group-hover/attack:bg absolute inset-0 m-auto w-3/4 text-center text-amber-300 opacity-0 hover:rounded-lg group-hover/attack:bg-zinc-800 group-hover/attack:opacity-90">
                Attack
              </p>
            </div>
          )}
          {armor > 0 ? <p>🛡️{armor}</p> : null}

          <div className="group/health relative">
            <p>
              ❤️{currentHealth}/{maxHealth}
            </p>
            <p className="group-hover/health:bg absolute inset-0 m-auto w-3/4 text-center text-amber-300 opacity-0 hover:rounded-lg group-hover/health:bg-zinc-800 group-hover/health:opacity-90">
              Health
            </p>
          </div>

          {/*           {(unit.combatsSurvived ?? 0) > 0 && (
            <div className="group/survived relative">
              <p>⭐{unit.combatsSurvived}</p>
              <p className="group-hover/survived:bg absolute inset-0 m-auto w-3/4 text-center text-amber-300 opacity-0 hover:rounded-lg group-hover/survived:bg-zinc-800 group-hover/survived:opacity-90">
                Survived
              </p>
            </div>
          )} */}
        </div>
      </div>
    </>
  );
}
