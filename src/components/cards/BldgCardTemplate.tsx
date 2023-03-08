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
      className={`${bg} group m-1 grid 
      h-44 w-32
      grid-rows-[repeat(5,1fr)_0.5fr] gap-1 rounded-lg border-zinc-900/50 bg-zinc-800 bg-cover bg-center text-white saturate-125 hover:-translate-y-0.5 hover:shadow-lg hover:shadow-gray-500/50 sm:m-2 sm:h-64 sm:w-52`}
    >
      {children}
    </div>
  );
}
