import React from "react";

interface PostCombatSummaryProps {}

export default function PostCombatSummary({}: PostCombatSummaryProps) {
  return (
    /* FIXME: Having to define rows!! */
    /* TODO: Use a list here, make all sections DRY using props */
    <div className="grid aspect-[4/1] auto-rows-min grid-cols-4 overflow-y-auto overflow-x-hidden rounded-md border-4 border-blue-900 bg-white/5 p-2 text-xs text-white shadow-md shadow-gray-500/50 sm:text-sm md:text-base lg:gap-1 lg:text-lg xl:text-2xl">
      <p className="col-span-4 text-center font-bold">Battle Summary</p>
      <p className="col-start-1 row-start-2">
        <span className="text-green-500">Defeated</span> 14 units:
      </p>
      <p className="col-start-1 row-start-3 ml-2 ">3 melee</p>
      <p className="col-start-1 row-start-4 ml-2 ">4 pewpew</p>
      <p className="col-start-1 row-start-5 ml-2 ">5 tanky</p>
      <p className="col-start-2 row-start-2">
        <span className="text-red-500">Lost</span> 5 units:
      </p>
      <p className="col-start-2 row-start-3 ml-2 ">3 melee</p>
      <p className="col-start-2 row-start-4 ml-2 ">1 pewpew</p>
      <p className="col-start-2 row-start-5 ml-2 ">1 tanky</p>
      <p className="col-start-3 row-start-2">
        4 units <span className="text-amber-500">injured</span>:
      </p>
      <p className="col-start-3 row-start-3 ml-2 ">1 melee</p>
      <p className="col-start-3 row-start-4 ml-2 ">2 pewpew</p>
      <p className="col-start-3 row-start-5 ml-2 ">1 tanky</p>
      <p className="col-start-4 row-start-2">
        4 buildings <span className="text-red-500">damaged</span>:
      </p>
      <p className="col-start-4 row-start-3 ml-2">Armorsmith</p>
      <p className="col-start-4 row-start-4 ml-2">Town Center</p>
      <p className="col-start-4 row-start-5 ml-2">Meal Hall</p>
      <p className="col-start-4 row-start-6 ml-2">Scouting Post</p>
    </div>
  );
}
