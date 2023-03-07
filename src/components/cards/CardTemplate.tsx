import React, { ReactNode } from "react";

interface CardTemplateProps {
  color:
    | "blue"
    | "red"
    | "orange"
    | "amber"
    | "green"
    | "resources"
    | "buildings";
  children: ReactNode;
}

export default function CardTemplate({ color, children }: CardTemplateProps) {
  let bgColor = `bg-${color}-800/5`;

  switch (color) {
    case "blue":
      bgColor = "bg-gradient-to-r from-slate-800/70 to-slate-900/70";
      break;
    case "red":
      bgColor = "bg-gradient-to-r from-red-700/30 to-red-900/30";
      break;
    case "orange":
      bgColor = "bg-gradient-to-r from-orange-600/30 to-orange-900/30";
      break;
    case "amber":
      bgColor = "bg-amber-800/5";
      break;
    case "green":
      bgColor = "bg-green-800/5";
      break;
    case "resources":
      bgColor = "bg-resourcesColor";
      break;
    case "buildings":
      bgColor = "bg-buildingsColor";
      break;
  }

  return (
    /* TODO: Different colored borders backgrounds and blur as necessary */
    // only difference between this and BldfCardTemplate is border-b-0 in BldgCardTemplate
    <div
      className={`group m-2 grid w-52 auto-rows-auto justify-around rounded-lg ${bgColor} text-white hover:-translate-y-0.5 hover:shadow-lg hover:shadow-gray-500/50`}
    >
      {children}
    </div>
  );
}
