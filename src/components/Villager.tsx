import React, { useState } from "react";
import { Resources } from "../types/Resources";

/* TODO: Consider if it would be cleaner to ditch villagers and harvest a resource per click.
Could have a limit on clicks (energy bar, actions available, etc), each click uses energy.
Basically the same result since villagers are reset each turn. */

interface VillagerProps {
  name: "🪓 Woodcutters" | "⚒️ Stonemasons" | "🥽 Metalworkers";
  workerType: "woodcutters" | "stonemasons" | "metalworkers";
  resources: Resources;
  setResources: any;
}

// @ts-ignore
export default function Villager({
  name,
  workerType,
  resources,
  setResources,
}: VillagerProps) {
  const handlePlusClick = (workerType: string) => {
    if (resources.freeworkers > 0) {
      //@ts-ignore
      /* const worker = resources[workerType]; */

      // TODO: Figure out why defense isn't working
      /* if (!worker) {
        // Defensive programming
        console.log("whoops");
        return;
      }
      */
      const updatedResources = { ...resources };
      // @ts-ignore
      updatedResources.freeworkers = updatedResources.freeworkers - 1;
      //@ts-ignore
      updatedResources[workerType] = updatedResources[workerType] + 1;

      setResources(updatedResources);
    } else {
      alert("No free workers!");
    }
  };

  const handleMinusClick = (workerType: string) => {
    //@ts-ignore
    if (resources[workerType] > 0) {
      // @ts-ignore
      /* const worker = resources[workerType]; */

      /* if (!worker) {
        // Defensive programming
        return;
      } */

      const updatedResources = { ...resources };
      updatedResources.freeworkers = updatedResources.freeworkers + 1;
      // @ts-ignore
      updatedResources[workerType] = updatedResources[workerType] - 1;
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
          onClick={() => handlePlusClick(workerType)}
        >
          +1
        </button>
        <button
          className="bg-white hover:bg-gray-100 text-gray-800 font-semibold py-1 px-2 border border-gray-400 rounded shadow"
          //@ts-ignore
          onClick={() => handleMinusClick(workerType)}
        >
          -1
        </button>
        {/* @ts-ignore */}
        {name}: {resources[workerType]}
      </div>
    </>
  );
}
