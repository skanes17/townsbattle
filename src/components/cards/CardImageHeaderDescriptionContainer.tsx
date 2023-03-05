import React from "react";
import { BaseResourceType, Resources } from "../../types";
import CardBgWithImage from "./CardBgWithImage";
import NewCardHeader from "./NewCardHeader";
import WorkerAssignCollect from "./worker/WorkerAssignCollect";
import WorkerCardHoverText from "./worker/WorkerCardHoverText";

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
    <>
      <CardBgWithImage bgImage={bgImage}>
        <NewCardHeader cardName={cardName} />
        <WorkerCardHoverText
          resources={resources}
          resourceType={resourceType}
        />
      </CardBgWithImage>
      <WorkerAssignCollect resources={resources} resourceType={resourceType} />
    </>
  );
}

//TODO: Next, try centering the div somehow in the remaining space

// NewCardHeader
/* `mx-2 flex h-8 items-center justify-center rounded-lg border border-white/25
bg-neutral-900/30 text-lg font-bold backdrop-blur-sm` */

// CardTemplate
/* `group grid w-52 auto-rows-auto gap-1 rounded-lg border 
border-white/10 bg-zinc-800 bg-cover bg-center p-1 pt-0 pb-1
text-white hover:-translate-y-0.5 hover:shadow-lg hover:shadow-gray-500/50` */
