import React, { ReactNode } from "react";
import { BaseResourceType, Resources } from "../../types";

interface CardHoverTextProps {
  children: ReactNode;
}

export default function CardHoverText({ children }: CardHoverTextProps) {
  return (
    <div className="row-span-4 m-auto flex w-3/4 place-items-center items-center justify-center rounded-sm border-slate-300 bg-slate-300/90 p-2 text-center text-xs font-semibold text-black opacity-0 shadow-md backdrop-grayscale transition-all ease-in-out group-hover:opacity-100 group-active:opacity-100 sm:text-sm">
      {children}
    </div>
  );
}
