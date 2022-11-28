import React from "react";

interface CardNameProps {
  cardName: string;
}

export default function CardName({ cardName }: CardNameProps) {
  return (
    <div className="flex justify-center items-center h-8 bg-indigo-200 text-lg font-bold mx-2 rounded-b-md col-span-3">
      {cardName}
    </div>
  );
}
