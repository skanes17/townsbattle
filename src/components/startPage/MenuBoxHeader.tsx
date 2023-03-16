import React from "react";

interface MenuBoxHeaderProps {
  children: string;
}

export default function MenuBoxHeader({ children }: MenuBoxHeaderProps) {
  return <p className="mt-2 leading-relaxed text-white">{children}</p>;
}
