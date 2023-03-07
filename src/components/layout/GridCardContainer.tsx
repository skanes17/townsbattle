import React, { ReactNode } from "react";
interface GridCardContainerProps {
  children: ReactNode;
  headerText: string;
}

export default function GridCardContainer({
  children,
  headerText,
}: GridCardContainerProps) {
  return (
    <div className={`rounded-lg border border-transparent p-1 sm:m-2`}>
      <div className="text-center text-lg font-bold">{headerText}</div>
      <div className="flex flex-wrap justify-center align-middle">
        {children}
      </div>
    </div>
  );
}
