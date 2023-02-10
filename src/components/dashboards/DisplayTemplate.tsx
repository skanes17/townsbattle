import React, { ReactNode } from "react";

interface DisplayTemplateProps {
  headerText: string;
  children: ReactNode;
}

/* the purpose of this component is to structure the display of mapped data
a header is created within the dashboard
a simple grid is set up below it
the grid uses columns to display data for an item (eg symbol for unit in training + count) */

export default function DisplayTemplate({
  headerText,
  children,
}: DisplayTemplateProps) {
  return (
    <div className="m-1">
      <div className="text-center font-bold sm:text-sm md:text-base lg:text-lg">
        {headerText}
      </div>
      <div className="grid auto-cols-max grid-flow-col justify-center gap-4 transition duration-75 ease-in-out md:text-lg lg:text-2xl">
        {/* the mapping of symbol and counts gets sent here */}
        {children}
      </div>
    </div>
  );
}
