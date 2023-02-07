import React from "react";

interface BldgCardHeaderProps {
  cardName: string;
}

export default function BldgCardHeader({ cardName }: BldgCardHeaderProps) {
  return (
    <div
      className={`z-10 col-span-full row-span-1 row-start-1 mx-2 flex h-8 items-center justify-center rounded-b-md bg-indigo-600/75 text-lg font-bold`}
    >
      {cardName}
    </div>
  );
}
