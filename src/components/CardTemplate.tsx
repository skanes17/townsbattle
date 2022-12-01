import React from "react";

export default function CardTemplate({ children }: any) {
  return (
    /* // FIXME: Get consistent height without it looking weird
    <div className="grid h-auto w-44 auto-rows-auto grid-cols-3 gap-1 rounded-md border-4 border-blue-900 bg-white pb-2 text-black shadow-md shadow-gray-500/50 transition ease-in-out hover:scale-105"> */
    <div className="grid h-72 w-52 auto-rows-auto grid-cols-3 gap-1 rounded-md border-4 border-blue-900 bg-white pb-2 text-black shadow-md shadow-gray-500/50 transition duration-75 ease-in-out hover:scale-105">
      {children}
    </div>
  );
}
