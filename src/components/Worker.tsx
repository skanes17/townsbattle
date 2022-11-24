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
      <div>
        <button
          className="bg-white hover:bg-gray-100 text-gray-800 font-semibold py-1 px-2 border border-gray-400 rounded shadow"
          //@ts-ignore
          onClick={() => handlePlusClick(resourceType)}
        >
          +1
        </button>
        <button
          className="bg-white hover:bg-gray-100 text-gray-800 font-semibold py-1 px-2 border border-gray-400 rounded shadow"
          //@ts-ignore
          onClick={() => handleMinusClick(resourceType)}
        >
          -1
        </button>
        {/* @ts-ignore */}
        {resources[resourceType].workerName}: {resources[resourceType].workers}{" "}
        {/* // FIX! */}
      </div>
    </>
  );
}
