import React from "react";

interface CardSymbolProps {
  cardSymbol: string;
}

export default function CardName({ cardSymbol }: CardSymbolProps) {
  return (
    <div className="text-5xl flex justify-center items-center col-span-3">
      {cardSymbol}
    </div>
  );
}
