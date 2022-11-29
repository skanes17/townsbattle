import React from "react";
interface FlexWrapContainerProps {
  children: any;
  headerText: string;
}

export default function FlexWrapContainer({
  children,
  headerText,
}: FlexWrapContainerProps) {
  return (
    <div className="p-4 border border-blue-900">
      <div className="font-bold">{headerText}</div>
      <div className="flex flex-wrap space-x-2">{children}</div>
    </div>
  );
}
