import React from "react";

interface CardImageProps {
  src: string;
}

export default function CardImage({ src }: CardImageProps) {
  return (
    <div className="col-span-3 flex h-16 items-center justify-center">
      <img className="mx-auto h-16 w-16" src={src} alt={`building`} />
    </div>
  );
}
