import React from "react";
import { MenuItemProps } from "../../types";

export default function MenuItem({ text, icon }: MenuItemProps) {
  return (
    <>
      <div>{icon}</div>
      <div className="ml-2">{text}</div>
    </>
  );
}
