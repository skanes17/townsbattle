import React from "react";

interface CardShowCountProps {
  countToShow: number | string;
}

export default function CardShowCount({ countToShow }: CardShowCountProps) {
  return (
    <div className="text-lg font-bold text-green-700 flex justify-center items-center px-4">
      {/* @ts-ignore */}
      {countToShow}
    </div>
  );
}
