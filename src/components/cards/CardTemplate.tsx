import React, { ReactNode } from "react";

interface CardTemplateProps {
  children: ReactNode;
}

export default function CardTemplate({ children }: CardTemplateProps) {
  return (
    /* // FIXME: Get consistent height without it looking weird
    <div className="grid h-auto w-44 auto-rows-auto grid-cols-3 gap-1 rounded-md border-4 border-blue-900 bg-white pb-2 text-black shadow-md shadow-gray-500/50 transition ease-in-out hover:scale-105"> */
    /* TODO: Reminagine and apply a tailwind background to this div, then the components can lay above it */
    <div className="grid h-72 w-52 auto-rows-auto grid-cols-3 gap-1 rounded-md border-4 border-blue-900 bg-white/5 px-1 text-white hover:-translate-y-0.5 hover:shadow-lg hover:shadow-gray-500/50">
      {children}
    </div>
  );
}
