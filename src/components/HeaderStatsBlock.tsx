import React from "react";

export default function HeaderResources(headerText: string, children: any) {
  return (
    <div>
      <div className="font-bold text-lg">{headerText}</div>
      <div className="grid lg:text-2xl md:text-lg grid-flow-col gap-4 auto-cols-max">
        {children}
      </div>
    </div>
  );
}
