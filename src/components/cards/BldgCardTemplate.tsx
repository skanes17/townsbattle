import React, { ReactNode } from "react";
import { Buildings, BuildingType } from "../../types";

interface BldgCardTemplateProps {
  bgImage?: string;
  children: ReactNode;
}

export default function BldgCardTemplate({
  bgImage,
  children,
}: BldgCardTemplateProps) {
  const bg = bgImage;

  return (
    <div
      className={`${bg} group grid h-64 w-52 auto-rows-auto justify-around gap-1 rounded-lg border-4 border-b-0 border-zinc-900/50 bg-zinc-800 bg-cover bg-center text-white saturate-125 hover:-translate-y-0.5 hover:shadow-lg hover:shadow-gray-500/50`}
    >
      {children}
    </div>
  );
}
