import React from "react";

interface CardNameProps {
  cardName: string;
}

export default function CardName({ cardName }: CardNameProps) {
  return (
    <div
      className={`col-span-3 mx-2 flex h-8 items-center justify-center rounded-b-md bg-indigo-200 text-lg font-bold`}
    >
      {cardName}
    </div>
  );
}
