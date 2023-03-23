import React from "react";
import { MenuItemProps } from "../../types";

export default function MenuItem({ text, icon }: MenuItemProps) {
  return (
    <>
      <div className="mr-1 font-emoji sm:mr-2">{icon}</div>
      <div className="ml-1 sm:ml-2">{text}</div>
    </>
  );
}
