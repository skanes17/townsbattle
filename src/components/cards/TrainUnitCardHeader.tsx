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
      <p>
        <span className="font-emoji">🗡️</span>
        <span>{attack}</span>
      </p>
      <p>{cardName}</p>
      <p>
        <span className="font-emoji">❤️</span>
        <span>{health}</span>
      </p>
      {armor > 0 && (
        <p>
          <span className="font-emoji">🛡️</span>
          <span>{armor}</span>
        </p>
      )}
    </div>
  );
}
