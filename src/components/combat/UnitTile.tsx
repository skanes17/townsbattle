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
    healthBarColor = "bg-red-400";
    hoverBorder = "hover:border-red-300/100";
  } else if (percentHealth <= 50) {
    healthBarColor = "bg-orange-400";
    hoverBorder = "hover:border-orange-300/100";
  } else {
    healthBarColor = "bg-green-400";
    hoverBorder = "hover:border-green-300/100";
  }

  if (phase === Phases.Combat && unit === selectedUnit) {
    borderWidth = "border-2";
    if (percentHealth <= 25) {
      borderColor = "border-red-400/80";
    } else if (percentHealth <= 50) {
      borderColor = "border-orange-400/80";
    } else {
      borderColor = "border-green-400/80";
    }
  } else {
    borderWidth = "border-2";
    borderColor = "border-white/20";
  }

  // if the unit dies, give a red overlay
  if (unit.currentHealth === 0) {
    bgColor = "bg-red-700/20";
  }

  return (
    <>
      {/* TODO: Replace with proper images */}
      <div
        className={`square group relative my-auto mx-auto max-w-min snap-center justify-items-center rounded-md ${bgColor} ${borderWidth} ${borderColor} p-1 text-center shadow-inner ${hoverBorder}`}
      >
        <div className="pb-1 text-xl sm:text-3xl md:text-3xl lg:text-3xl xl:text-3xl">
          {unit.symbol}
          {/* If you want the skull icon when the unit dies:
          {unit.currentHealth === 0 ? "💀" : unit.symbol} */}
        </div>
        <div
          className={`h-2 ${healthWidth} ${healthBarColor} rounded-sm transition-all duration-500 ease-out`}
        ></div>
        {/* Popup text */}
        <span className="pointer-events-none absolute top-16 left-1/2 z-50 -translate-x-1/2 whitespace-nowrap rounded bg-black/80 px-2 py-1 text-center text-xs text-white opacity-0 before:absolute before:border-transparent before:border-t-black group-hover:opacity-100 sm:text-xs lg:text-sm xl:text-sm">
          {/* TODO: Add space for randomly generated name */}
          <div>Unit Name</div>
          <div>
            {unit.name}_{unit.id}
          </div>
          <div>Attack: {unit.attack}</div>
          <div>
            HP: {unit.currentHealth}/{unit.maxHealth}
          </div>
          <div>{unit.description}</div>
          {unit.armor > 0 ? <div>Armor: {unit.armor}</div> : null}
        </span>
      </div>
    </>
  );
}
