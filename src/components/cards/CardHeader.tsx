import React from "react";

interface CardHeaderProps {
  cardName: string;
}

export default function CardHeader({ cardName }: CardHeaderProps) {
  return (
    <div
      className={`mx-2 flex h-8 items-center justify-center rounded-tl-lg rounded-br-md rounded-bl-[1px] rounded-tr-[1px] border border-white/25 bg-neutral-900/30 text-lg font-bold capitalize backdrop-blur-sm`}
      /* className={`col-span-3 row-start-1 row-end-2 mx-2 flex h-8 items-center justify-center rounded-b-md bg-indigo-600/50 text-lg font-bold`} */
    >
      {cardName}
    </div>
  );
}
