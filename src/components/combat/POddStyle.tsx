import React, { ReactNode } from "react";

interface POddStyleProps {
  children: ReactNode;
}

export default function POddStyle({ children }: POddStyleProps) {
  return <p className="odd:bg-white/5">{children}</p>;
}
