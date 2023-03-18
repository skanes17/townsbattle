import React from "react";

interface TrainUnitCardHeaderProps {
  cardName: string;
  attack: number;
  health: number;
  armor: number;
}

export default function TrainUnitCardHeader({
  cardName,
  attack,
  health,
  armor,
}: TrainUnitCardHeaderProps) {
  return (
    <div
      className={`m-1 flex h-6 flex-row items-center justify-between rounded-lg border border-white/25 bg-black/40 px-1
      text-xs font-bold capitalize backdrop-blur-[1px] sm:text-lg sm:backdrop-blur-sm`}
    >
      <span>
        🗡️
        {attack}
      </span>
      <span>{cardName}</span>
      <span>❤️{health}</span>
      {armor > 0 && <span>🛡️{armor}</span>}
    </div>
  );
}
