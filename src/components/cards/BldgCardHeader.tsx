import React from "react";

interface BldgCardHeaderProps {
  cardName: string;
}

export default function BldgCardHeader({ cardName }: BldgCardHeaderProps) {
  return (
    <div
      className={`mx-2 flex h-8 items-center justify-center rounded-lg border border-white/25 bg-neutral-900/30 text-lg font-bold backdrop-blur-sm`}
    >
      {cardName}
    </div>
  );
}
