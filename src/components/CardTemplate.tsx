import React from "react";

export default function CardTemplate({ children }: any) {
  return (
    <div className="grid h-auto w-44 auto-rows-auto grid-cols-3 gap-1 rounded-md border-4 border-blue-900 bg-white pb-2 text-black shadow-md shadow-gray-500/50 transition ease-in-out hover:scale-105">
      {children}
    </div>
  );
}
