import React from "react";

interface CardSymbolProps {
  cardSymbol: string;
}

export default function CardSymbol({ cardSymbol }: CardSymbolProps) {
  return (
    <div className="col-span-3 flex items-center justify-center text-5xl">
      {cardSymbol}
    </div>
  );
}
