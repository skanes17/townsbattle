import React from "react";

export default function HeaderResources(headerText: string, children: any) {
  return (
    <div>
      <div className="text-lg font-bold">{headerText}</div>
      <div className="grid auto-cols-max grid-flow-col gap-4 md:text-lg lg:text-2xl">
        {children}
      </div>
    </div>
  );
}
