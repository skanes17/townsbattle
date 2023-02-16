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
    /* TODO: Consider setting a minimum height for consistency -- eg. min-h-[16rem]*/
    <div
      className={`grid w-52 auto-rows-auto grid-cols-1 gap-1 rounded-lg border-t-4 border-l-4 border-r-4 border-gray-900/50 bg-white/5 hover:-translate-y-0.5 hover:shadow-lg hover:shadow-gray-500/50 ${bg} bg-cover bg-center  text-white`}
    >
      {children}
    </div>
  );
}

/*
// FIXME: Find a way to add a slight border -- see example code which would wrap the card
<div
className={`rounded-lg border border-white/10 hover:-translate-y-0.5 hover:shadow-lg hover:shadow-gray-500/50`}
>
</div>
*/
