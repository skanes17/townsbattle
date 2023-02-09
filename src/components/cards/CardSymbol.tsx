import React from "react";

interface CardSymbolProps {
  cardSymbol: string;
}

export default function CardSymbol({ cardSymbol }: CardSymbolProps) {
  return (
    <div className="my-1 flex items-center justify-center text-5xl">
      {cardSymbol}
    </div>
  );
}

/* TODO: Incorporate hover text for cards which show description */
// this code is functional with placeholder text
/* 
 <div className="col-span-3 flex items-center justify-center text-5xl">
      <div className="group relative">
        {cardSymbol}
        <span
          className="pointer-events-none absolute top-16 left-1/2 z-50 -translate-x-1/2 whitespace-nowrap rounded bg-black/80 px-2 py-1 text-center text-xs text-white opacity-0 before:absolute before:border-transparent before:border-t-black group-hover:opacity-100 sm:text-xs lg:text-sm xl:text-sm
"
        >
          Attack and health are roughly balanced.
        </span>
      </div>
    </div>
*/
