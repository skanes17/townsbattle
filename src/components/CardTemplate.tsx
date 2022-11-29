import React from "react";

export default function CardTemplate({ children }: any) {
  return (
    <div className="pb-2 bg-white text-black w-44 h-60 border-4 border-blue-900 rounded-md shadow-md shadow-gray-500/50 grid grid-cols-3 gap-1 auto-rows-auto">
      {children}
    </div>
  );
}
