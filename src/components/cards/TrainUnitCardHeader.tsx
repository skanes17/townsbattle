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
    <>
      <div className="grid grid-cols-3">
        <div className={`ml-1 flex h-8 items-center justify-start text-lg`}>
          🗡️
          {attack}
        </div>
        <div
          className={`flex h-8 items-center justify-center text-lg font-bold`}
        >
          {cardName}
        </div>
        <div className={`mr-1 flex h-8 items-center justify-end text-lg`}>
          ❤️{health}
        </div>
      </div>
    </>
  );
}
