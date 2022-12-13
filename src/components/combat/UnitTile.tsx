import React from "react";
import { Unit } from "../../types/Unit";

interface UnitTileProps {
  unit: Unit;
}

export default function UnitTile({ unit }: UnitTileProps) {
  const percentHealth = (unit.currentHealth / unit.maxHealth) * 100;
  let healthWidth, healthBarColor, hoverBorder;
  if (percentHealth <= 5) {
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

  /* TODO: Connect HealthTextColor to unit cards */
  if (percentHealth <= 25) {
    healthBarColor = "bg-red-400";
    hoverBorder = "hover:border-red-300/80";
  } else if (percentHealth <= 50) {
    healthBarColor = "bg-orange-400";
    hoverBorder = "hover:border-orange-300/80";
  } else {
    healthBarColor = "bg-green-400";
    hoverBorder = "hover:border-green-300/80";
  }

  return (
    <>
      <div
        className={`square group relative my-auto mx-auto max-w-min snap-center justify-items-center rounded-md border-2 border-white/20 p-1 text-center shadow-inner ${hoverBorder}`}
      >
        <div className="pb-1 text-xl sm:text-3xl md:text-3xl lg:text-3xl xl:text-3xl">
          {unit.nameSymbol}
        </div>
        {/* TODO: Determine healthbar size and color from current health */}
        {/* TODO: Match hover color with health status eg. red for hurtin */}
        <div
          className={`h-2 ${healthWidth} ${healthBarColor} rounded-sm`}
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
