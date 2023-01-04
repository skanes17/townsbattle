import React from "react";
import { MenuItemProps } from "../../types/MenuItem";

export default function MenuItem({ text, icon, onClick }: MenuItemProps) {
  return (
    <div
      className="flex w-3/5 cursor-pointer flex-row justify-between rounded border border-white bg-indigo-700 p-1 text-slate-200 hover:bg-indigo-800"
      onClick={() => onClick()}
    >
      <div>{text}</div>
      <div>{icon}</div>
    </div>
  );
}
