import React from "react";

export default function CombatCardTemplate({ children }: any) {
  return (
    <div className="grid h-full w-full auto-rows-auto grid-cols-3 gap-1 rounded-md border-4 border-blue-900 bg-white p-2 text-black shadow-md shadow-gray-500/50">
      {children}
    </div>
  );
}

/* 
card col-span-5 col-start-1 row-span-3 row-start-3 mr-4 w-4/5 max-w-xs justify-self-end rounded-md bg-blue-400 px-4
*/
