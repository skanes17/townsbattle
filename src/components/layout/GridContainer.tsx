import React, { ReactNode } from "react";
interface GridContainerProps {
  children: ReactNode;
  headerText: string;
}

export default function GridContainer({
  children,
  headerText,
}: GridContainerProps) {
  return (
    <div className="p-4">
      <div className="grid grid-cols-3">
        <div className="col-span-3 text-center text-lg font-bold">
          {headerText}
        </div>
        <div className="flex flex-wrap space-x-2">{children}</div>
      </div>
    </div>
  );
}
