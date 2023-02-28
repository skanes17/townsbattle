import React, { ReactNode } from "react";

interface CardTemplateProps {
  color: "blue" | "red" | "orange" | "amber" | "green";
  children: ReactNode;
}

export default function CardTemplate({ color, children }: CardTemplateProps) {
  let bgColor = `bg-${color}-800/5`;

  switch (color) {
    case "blue":
      bgColor = "bg-blue-800/5";
      break;
    case "red":
      bgColor = "bg-red-800/5";
      break;
    case "orange":
      bgColor = "bg-orange-800/5";
      break;
    case "amber":
      bgColor = "bg-amber-800/5";
      break;
    case "green":
      bgColor = "bg-green-800/5";
      break;
  }

  return (
    /* // FIXME: Get consistent height without it looking weird
    <div className="grid h-auto w-44 auto-rows-auto grid-cols-3 gap-1 rounded-md border-4 border-blue-900 bg-white pb-2 text-black shadow-md shadow-gray-500/50 transition ease-in-out hover:scale-105"> */
    /* TODO: Jan 8 -- Reimagine and apply a tailwind background (like with bg-mainMenu) to this div, then the components can lay above it, different colored backgrounds and blur as necessary */
    <div
      className={`group grid w-52 auto-rows-auto gap-1 rounded-lg border border-white/10 p-1 pt-0 ${bgColor} text-white hover:-translate-y-0.5 hover:shadow-lg hover:shadow-gray-500/50`}
    >
      {children}
    </div>
  );
}
