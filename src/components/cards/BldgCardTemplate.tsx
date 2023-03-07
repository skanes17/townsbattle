import React, { ReactNode } from "react";

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
      className={`${bg} group grid h-52 w-44 grid-rows-[repeat(5,1fr)_0.5fr] gap-1 rounded-lg border-4 border-b-0 border-zinc-900/50 bg-zinc-800 bg-cover bg-center text-white saturate-125 hover:-translate-y-0.5 hover:shadow-lg hover:shadow-gray-500/50 sm:h-64 sm:w-52`}
    >
      {children}
    </div>
  );
}
