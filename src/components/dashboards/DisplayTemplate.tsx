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
  /* TODO: Fix this catch with more robust code */
  const hideArmyOnMobile = headerText === `Army` ? `hidden` : `inline-flex`;

  return (
    <div className="m-1 text-base sm:text-lg lg:text-2xl">
      <div className="mb-1 text-center font-bold">{headerText}</div>
      <div
        className={`${hideArmyOnMobile} flex-wrap justify-center gap-1 transition duration-75 ease-in-out sm:inline-flex sm:gap-2 md:gap-3 lg:gap-4`}
      >
        {/* the mapping of symbol and counts gets sent here */}
        {children}
      </div>
    </div>
  );
}
