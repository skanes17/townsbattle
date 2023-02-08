import React from "react";

interface BldgCardHeaderProps {
  cardName: string;
}

export default function BldgCardHeader({ cardName }: BldgCardHeaderProps) {
  return (
    <div
      className={`z-10 col-span-full row-span-1 row-start-1 mx-2 flex h-8 items-center justify-center rounded-tl-lg rounded-br-md rounded-bl-[1px] rounded-tr-[1px] border border-white/25 bg-neutral-900/30 text-lg font-bold backdrop-blur-sm`}
    >
      {cardName}
    </div>
  );
}
