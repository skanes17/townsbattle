// put MenuButtons in here
import React, { ReactNode } from "react";

interface MenuButtonContainerProps {
  headerText: string;
  children: ReactNode;
}

export default function MenuButtonContainer({
  headerText,
  children,
}: MenuButtonContainerProps) {
  return (
    <div className="relative">
      <div className="mt-6 text-lg font-medium text-white">{headerText}</div>
      <div className="my-3 items-center gap-2 space-y-1 sm:flex">
        {children}
      </div>
    </div>
  );
}
