import React, { ReactNode } from "react";

interface CardTemplateProps {
  children: ReactNode;
}

export default function CardTemplate({ children }: CardTemplateProps) {
  return (
    /* // FIXME: Get consistent height without it looking weird
    <div className="grid h-auto w-44 auto-rows-auto grid-cols-3 gap-1 rounded-md border-4 border-blue-900 bg-white pb-2 text-black shadow-md shadow-gray-500/50 transition ease-in-out hover:scale-105"> */
    /* TODO: Jan 8 -- Reimagine and apply a tailwind background (like with bg-army) to this div, then the components can lay above it, different colored backgrounds and blur as necessary */
    <div
      className={`grid w-52 auto-rows-auto gap-1 rounded-lg border-4 border-indigo-900/50 bg-white/5 text-white hover:-translate-y-0.5 hover:shadow-lg hover:shadow-gray-500/50`}
    >
      {children}
    </div>
  );
}
