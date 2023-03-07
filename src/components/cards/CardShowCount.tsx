import React from "react";

interface CardShowCountProps {
  countToShow: number | string;
}

export default function CardShowCount({ countToShow }: CardShowCountProps) {
  let countStyle;
  if (countToShow > 0) {
    countStyle = "font-bold text-amber-400";
  }

  return (
    <div
      className={`flex items-center justify-center px-4 text-sm 
      sm:text-xl ${countStyle}`}
    >
      {countToShow}
    </div>
  );
}
