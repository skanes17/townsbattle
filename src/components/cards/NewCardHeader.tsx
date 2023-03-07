import React from "react";

interface NewCardHeaderProps {
  cardName: string;
}

export default function NewCardHeader({ cardName }: NewCardHeaderProps) {
  return (
    <div
      className={`m-1 flex h-6 items-center justify-center rounded-lg border border-white/25 bg-black/25 text-xs font-bold capitalize backdrop-blur-sm sm:h-8 sm:text-lg`}
    >
      {cardName}
    </div>
  );
}
