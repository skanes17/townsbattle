import React from "react";

interface MenuTitleProps {
  title: string;
  subtitle: string;
}

export default function MenuTitle({ title, subtitle }: MenuTitleProps) {
  return (
    <div className="mb-2 rounded-xl border-4 border-slate-200 bg-slate-900/75 p-2 text-white backdrop-blur-sm sm:p-3 md:p-4 lg:p-5 xl:p-6 ">
      <div className="text-center text-5xl sm:text-6xl md:text-7xl lg:text-8xl xl:text-9xl">
        {title}
      </div>
    </div>
  );
}
