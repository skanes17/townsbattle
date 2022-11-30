import React from "react";

interface CardShowCountProps {
  countToShow: number | string;
}

export default function CardShowCount({ countToShow }: CardShowCountProps) {
  return (
    <div className="flex items-center justify-center px-4 text-lg font-bold text-green-700">
      {/* @ts-ignore */}
      {countToShow}
    </div>
  );
}
