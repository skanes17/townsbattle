import React, { ReactNode } from "react";

interface MenuBoxHeaderProps {
  children: ReactNode;
}

export default function MenuBoxHeader({ children }: MenuBoxHeaderProps) {
  return <p className="mt-2 leading-relaxed text-white">{children}</p>;
}
