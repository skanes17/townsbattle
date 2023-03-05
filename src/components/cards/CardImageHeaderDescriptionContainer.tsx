import React from "react";
import { BaseResourceType, Resources } from "../../types";

interface CardImageHeaderDescriptionContainerProps {
  cardName: string;
  bgImage: string;
  resources: Resources;
  resourceType: BaseResourceType;
}

export default function CardImageHeaderDescriptionContainer({
  cardName,
  bgImage,
  resources,
  resourceType,
}: CardImageHeaderDescriptionContainerProps) {
  return (
    <div className={`h-52 w-52 rounded-lg bg-wood bg-cover bg-center`}>
      <div
        className={`mx-2 flex h-8 items-center justify-center rounded-lg border border-white/25 bg-neutral-900/30
text-lg font-bold capitalize backdrop-blur-sm`}
      >
        {cardName}
      </div>
      <div className="m-auto flex w-3/4 place-items-center items-center justify-center rounded-sm border-slate-300 bg-slate-300/90 p-2 text-center text-sm font-semibold text-black opacity-0 shadow-md backdrop-grayscale transition-all ease-in-out group-hover:opacity-100 group-active:opacity-100">
        Gather {resources[resourceType].multiplier}{" "}
        {resources[resourceType].name} for every worker.
      </div>
    </div>
  );
}

//TODO: Next, try centering the div somehow in the remaining space

// BldgCardHeader
/* `mx-2 flex h-8 items-center justify-center rounded-lg border border-white/25
bg-neutral-900/30 text-lg font-bold backdrop-blur-sm` */

// CardTemplate
/* `group grid w-52 auto-rows-auto gap-1 rounded-lg border 
border-white/10 bg-zinc-800 bg-cover bg-center p-1 pt-0 pb-1
text-white hover:-translate-y-0.5 hover:shadow-lg hover:shadow-gray-500/50` */
