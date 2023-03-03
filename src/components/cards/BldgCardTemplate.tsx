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
      className={`${bg} group grid w-52 auto-rows-auto gap-1 rounded-lg border-4 border-b-0 border-zinc-900/50 bg-zinc-800 bg-cover bg-center text-white hover:-translate-y-0.5 hover:shadow-lg hover:shadow-gray-500/50`}
    >
      {children}
    </div>
  );
}
