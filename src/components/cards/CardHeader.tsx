import React from "react";

interface CardHeaderProps {
  bgColor?: "resources" | "buildings";
  cardName: string;
}

export default function CardHeader({ bgColor, cardName }: CardHeaderProps) {
  let bg;
  switch (bgColor) {
    // TODO: Incorporate dynamic colors for different sections
    case "buildings":
      bg = "bg-buildingsColor";
      break;
    case "resources":
      bg = "bg-resourcesColor";
      break;
    default:
      bg = "bg-zinc-700";
  }

  return (
    <div
      className={`mx-2 flex h-8 items-center justify-center rounded-b-lg rounded-br-md border border-t-0 border-white/25 ${bg} text-lg font-bold capitalize backdrop-blur-sm`}
      /* className={`col-span-3 row-start-1 row-end-2 mx-2 flex h-8 items-center justify-center rounded-b-md bg-indigo-600/50 text-lg font-bold`} */
    >
      {cardName}
    </div>
  );
}
