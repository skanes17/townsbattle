import React, { ReactNode } from "react";

interface BldgCardTemplateProps {
  children: ReactNode;
}

export default function BldgCardTemplate({ children }: BldgCardTemplateProps) {
  return (
    /* // FIXME: Get consistent height without it looking weird
    <div className="grid h-auto w-44 auto-rows-auto grid-cols-3 gap-1 rounded-md border-4 border-blue-900 bg-white pb-2 text-black shadow-md shadow-gray-500/50 transition ease-in-out hover:scale-105"> */
    <div className="grid w-52 auto-rows-auto gap-1 rounded-md border-4 border-blue-900 bg-white/5 px-1 text-white hover:-translate-y-0.5 hover:shadow-lg hover:shadow-gray-500/50">
      {children}
    </div>
  );
}
