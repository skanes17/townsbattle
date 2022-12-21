import React from "react";

interface CardHeaderProps {
  cardName: string;
}

export default function CardHeader({ cardName }: CardHeaderProps) {
  return (
    <div
      className={`col-span-3 mx-2 flex h-8 items-center justify-center rounded-b-md bg-indigo-600/50 text-lg font-bold`}
    >
      {cardName}
    </div>
  );
}
