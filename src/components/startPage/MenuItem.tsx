import React from "react";
import { MenuItemProps } from "../../types/Menu";

export default function MenuItem({ text, icon, onClick }: MenuItemProps) {
  return (
    <>
      <div>{text}</div>
      <div>{icon}</div>
    </>
  );
}
