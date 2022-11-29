import React from "react";

interface CardImageProps {
  src: string;
}

export default function CardImage({ src }: CardImageProps) {
  return (
    <div className="flex justify-center items-center h-16 col-span-3">
      <img className="mx-auto w-16 h-16" src={src} alt={`building`} />
    </div>
  );
}
