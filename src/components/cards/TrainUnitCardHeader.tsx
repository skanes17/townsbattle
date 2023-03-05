import React from "react";

interface TrainUnitCardHeaderProps {
  cardName: string;
  attack: number;
  health: number;
}

export default function TrainUnitCardHeader({
  cardName,
  attack,
  health,
}: TrainUnitCardHeaderProps) {
  return (
    <div
      className={`m-1 flex h-8 flex-row items-center justify-between rounded-lg border border-white/25 bg-black/25 px-1
text-lg font-bold capitalize backdrop-blur-sm`}
    >
      <span>
        🗡️
        {attack}
      </span>
      <span>{cardName}</span>
      <span>❤️{health}</span>
    </div>
  );
}
