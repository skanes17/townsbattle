import React from "react";

interface BldgCardHeaderProps {
  cardName: string;
}

export default function BldgCardHeader({ cardName }: BldgCardHeaderProps) {
  return (
    <div
      className={`col-span-3 row-start-1 row-end-2 mx-2 flex h-8 items-center justify-center rounded-b-md bg-indigo-600/50 text-lg font-bold`}
    >
      {cardName}
    </div>
  );
}
