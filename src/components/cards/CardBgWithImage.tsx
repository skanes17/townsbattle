import React, { ReactNode } from "react";

interface CardBgWithImageProps {
  bgImage: string;
  children: ReactNode;
}

export default function CardBgWithImage({
  bgImage,
  children,
}: CardBgWithImageProps) {
  const bg = bgImage;

  return (
    <div
      className={`${bg} grid h-52 w-52 grid-rows-5 rounded-lg border border-transparent bg-wood bg-cover bg-center bg-no-repeat`}
    >
      {children}
    </div>
  );
}
