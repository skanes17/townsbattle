import React from "react";
import { MenuItemProps } from "../../types/Menu";

export default function MenuItem({ text, icon, onClick }: MenuItemProps) {
  return (
    <div
      className="flex w-3/5 cursor-pointer select-none flex-row justify-between rounded border border-white bg-indigo-700 p-1 text-base text-slate-200 hover:bg-indigo-800 active:scale-95 sm:text-xl md:p-2 md:text-2xl lg:text-3xl xl:p-3 xl:text-4xl"
      onClick={() => onClick()}
    >
      <div>{text}</div>
      <div>{icon}</div>
    </div>
  );
}
