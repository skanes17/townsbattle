import React, { ReactNode } from "react";
interface FlexWrapContainerProps {
  children: ReactNode;
  headerText: string;
}

export default function FlexWrapContainer({
  children,
  headerText,
}: FlexWrapContainerProps) {
  return (
    <div className="p-4">
      <div className="text-center text-lg font-bold">{headerText}</div>
      <div className="grid auto-cols-auto grid-flow-col gap-1">{children}</div>
    </div>
  );
}

// TODO: Best way to layout cards?? Flex or grid?

// flex flex-wrap space-x-2
