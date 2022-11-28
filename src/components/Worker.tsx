import React, { useState } from "react";
import { Resources } from "../types/Resources";

/* TODO: Consider if it would be cleaner to ditch workers and harvest a resource per click.
Could have a limit on clicks (energy bar, actions available, etc), each click uses energy.
Basically the same result since workers are reset each turn. */

interface WorkerProps {
  /* name: string;
  workerType: string; */
  resources: Resources;
  setResources: any;
  resourceType: string;
}

// @ts-ignore
export default function Worker({
  /* name,
  workerType, */
  resources,
  setResources,
  resourceType,
}: WorkerProps) {
  const handlePlusClick = (resourceType: string) => {
    //@ts-ignore
    const selectedResource = resources[resourceType];
    if (!selectedResource) {
      alert("resource doesn't exist");
      return;
    }

    if (resources.freeworkers > 0) {
      const updatedResources = { ...resources };
      // @ts-ignore
      updatedResources.freeworkers = updatedResources.freeworkers - 1;
      //@ts-ignore
      updatedResources[resourceType].workers =
        //@ts-ignore
        updatedResources[resourceType].workers + 1;

      setResources(updatedResources);
    } else {
      alert("No free workers!");
    }
  };

  const handleMinusClick = (resourceType: string) => {
    //@ts-ignore
    const selectedResource = resources[resourceType];
    if (!selectedResource) {
      alert("resource doesn't exist");
      return;
    }

    //@ts-ignore
    if (resources[resourceType].workers > 0) {
      const updatedResources = { ...resources };
      updatedResources.freeworkers = updatedResources.freeworkers + 1;
      // @ts-ignore
      updatedResources[resourceType].workers =
        //@ts-ignore
        updatedResources[resourceType].workers - 1;
      setResources(updatedResources);
    }
  };

  // TODO: break this into its own component so I just send "woodcutters" once
  return (
    <>
      <div className="bg-white text-black w-40 h-40 border-4 border-blue-900 rounded-md shadow-md shadow-gray-500/50 grid grid-cols-3 gap-1">
        <div className="flex justify-center items-center h-8 bg-indigo-200 text-lg font-bold mx-2 rounded-b-md col-span-3">
          {/* @ts-ignore */}
          {resources[resourceType].workerName}
        </div>

        <div className="text-5xl flex justify-center items-center col-span-3">
          {/* @ts-ignore */}
          {resources[resourceType].workerSymbol}
        </div>

        <div className="flex justify-end items-center">
          <button
            className="w-8 bg-slate-200 hover:bg-emerald-500 text-gray-800 font-semibold py-1 px-2 border border-gray-400 rounded shadow"
            //@ts-ignore
            onClick={() => handlePlusClick(resourceType)}
          >
            +1
          </button>
        </div>

        <div className="text-lg font-bold flex justify-center items-center px-4">
          {/* @ts-ignore */}
          {resources[resourceType].workers}
        </div>

        <div className="flex justify-start items-center">
          <button
            className="w-8 bg-slate-200 hover:bg-red-500 text-gray-800 font-semibold py-1 px-2 border border-gray-400 rounded shadow"
            //@ts-ignore
            onClick={() => handleMinusClick(resourceType)}
          >
            -1
          </button>
        </div>
      </div>
    </>
  );
}

{
  /* <div className="bg-white text-black w-52 h-72 border-4 border-blue-900 rounded-md shadow-md shadow-gray-500/50 grid grid-cols-3 gap-1">
  <div className="flex justify-center items-center h-8 bg-indigo-200 text-lg font-bold mx-2 rounded-b-md col-span-3">
    {buildings[buildingType].name}
  </div>
  <div className="flex justify-center items-center h-16 col-span-3">
    <img className="mx-auto w-16 h-16" src={townCenter} alt={`building`} />
  </div>
  <div className="mx-4 p-1 h-28 shadow-sm bg-amber-100 border-slate-300 rounded-sm col-span-3">
    {buildings[buildingType].effect}
  </div>

  <div></div>
  <div className="bg-slate-800 text-md mt-4 px-1 rounded-t-lg text-white justify-self-center place-self-end">
    Tier {buildings[buildingType].tier}
  </div>
  <div className="bg-slate-800 text-md mt-4 px-1 rounded-tl-lg text-white place-self-end">
    ❤️{buildings[buildingType].health}
  </div>
</div>; */
}
