import React, { ReactNode } from "react";

interface CardBgWithImageProps {
  saturation: "oversaturated" | "normal" | "half" | "quarter" | "zero";
  bgImage?: string;
  children: ReactNode;
}

export default function CardBgWithImage({
  saturation,
  bgImage,
  children,
}: CardBgWithImageProps) {
  const bg = bgImage;

  let saturate;
  switch (saturation) {
    case "oversaturated":
      saturate = "saturate-125";
      break;
    case "normal":
      saturate = "saturate-100";
      break;
    case "half":
      saturate = "saturate-50";
      break;
    case "quarter":
      saturate = "saturate-25";
      break;
    case "zero":
      saturate = "saturate-0";
      break;
    default:
      saturate = "saturate-100";
  }

  return (
    <div
      className={`${bg} saturate- grid h-52 w-52 grid-rows-5 rounded-lg bg-cover bg-center bg-no-repeat ${saturate}`}
    >
      {children}
    </div>
  );
}
