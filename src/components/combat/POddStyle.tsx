import React from "react";

interface POddStyleProps {
  children: any;
}

export default function POddStyle({ children }: POddStyleProps) {
  return <p className="odd:bg-white/5">{children}</p>;
}
