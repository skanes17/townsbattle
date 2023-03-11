import React, { ReactNode } from "react";
import { BaseResourceType, Resources } from "../../types";
import CardBgWithImage from "./CardBgWithImage";
import CardHeader from "./CardHeader";
import CardHoverText from "./CardHoverText";

interface CardImageHeaderDescriptionContainerProps {
  saturation: "oversaturated" | "normal" | "half" | "quarter" | "zero";
  cardName: string;
  bgImage?: string;
  children: ReactNode;
}

export default function CardImageHeaderDescriptionContainer({
  saturation,
  cardName,
  bgImage,
  children,
}: CardImageHeaderDescriptionContainerProps) {
  return (
    <>
      <CardBgWithImage
        cardStyle="planning"
        saturation={saturation}
        bgImage={bgImage}
      >
        <CardHeader cardName={cardName} />
        <CardHoverText>{children}</CardHoverText>
      </CardBgWithImage>
    </>
  );
}

//TODO: Next, try centering the div somehow in the remaining space

// CardHeader
/* `mx-2 flex h-8 items-center justify-center rounded-lg border border-white/25
bg-neutral-900/30 text-lg font-bold backdrop-blur-sm` */

// CardTemplate
/* `group grid w-52 auto-rows-auto gap-1 rounded-lg border 
border-white/10 bg-zinc-800 bg-cover bg-center p-1 pt-0 pb-1
text-white hover:-translate-y-0.5 hover:shadow-lg hover:shadow-gray-500/50` */
