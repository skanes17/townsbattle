import React from "react";
import { Phases, Unit } from "../../types";

interface UnitTileProps {
  unit: Unit;
  selectedUnit?: Unit;
  phase?: Phases;
}

export default function UnitTile({ unit, selectedUnit, phase }: UnitTileProps) {
  let healthWidth,
    healthBarColor,
    hoverBorder,
    borderWidth,
    borderColor,
    bgColor;

  const bg = unit.bgImageSm ?? ``;

  const percentHealth = (unit.currentHealth / unit.maxHealth) * 100;

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
    healthBarColor = "bg-red-500";
    hoverBorder = "hover:border-red-500/100";
  } else if (percentHealth <= 50) {
    healthBarColor = "bg-red-400";
    hoverBorder = "hover:border-red-400/100";
  } else if (percentHealth <= 75) {
    healthBarColor = "bg-orange-400";
    hoverBorder = "hover:border-orange-400/100";
  } else {
    healthBarColor = "bg-green-400";
    hoverBorder = "hover:border-green-400/100";
  }

  let healthBarBackgroundColor =
    unit.currentHealth > 0 ? `bg-black/80` : `bg-red-500/40`;

  if (phase === Phases.Combat && unit === selectedUnit) {
    borderWidth = "border-2";
    if (percentHealth <= 25) {
      borderColor = "border-red-500/80";
    } else if (percentHealth <= 50) {
      borderColor = "border-orange-400/80";
    } else {
      borderColor = "border-green-400/80";
    }
  } else {
    borderWidth = "border-2";
    borderColor = "border-zinc-700";
  }

  // if the unit dies, give a red overlay
  if (unit.currentHealth === 0) {
    bgColor = "bg-red-700/20";
  }

  return (
    <>
      {/* TODO: Replace with proper images */}
      <div
        className={`${bg} group relative h-20 w-[3.33rem] snap-center justify-items-center rounded-md bg-cover bg-center sm:h-24 sm:w-[4rem] md:h-[7.5rem] md:w-20 ${bgColor} ${borderWidth} ${borderColor} p-1 text-center shadow-inner ${hoverBorder}`}
      >
        <div
          className={`absolute left-0 right-0 bottom-[2.5%] mx-auto h-2 w-[95%] rounded-sm ${healthBarBackgroundColor} backdrop-blur-[1px] md:h-3`}
        >
          <div
            className={`h-3 ${healthWidth} ${healthBarColor} rounded-sm transition-all duration-500 ease-out`}
          ></div>
        </div>
        {/* Popup text */}
        <span className="pointer-events-none fixed z-50 w-1/4 -translate-x-1/2 whitespace-normal rounded-lg bg-black/80 p-2 text-center text-xs text-white opacity-0 group-hover:opacity-100 sm:w-1/6 sm:text-base md:w-[10%]">
          {/* TODO: Add randomly generated name */}
          <p>
            {unit.name}
            {unit.id}
          </p>
          <p>🗡️ {unit.attack}</p>
          <p>
            ❤️ {unit.currentHealth}/{unit.maxHealth}
          </p>
          {unit.armor > 0 ? <p>🛡️ {unit.armor}</p> : null}
        </span>
      </div>
    </>
  );
}
