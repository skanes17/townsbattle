import React, { useState } from "react";
import { Resources } from "../types/Resources";

/* TODO: Consider if it would be cleaner to ditch villagers and harvest a resource per click.
Could have a limit on clicks (energy bar, actions available, etc), each click uses energy.
Basically the same result since villagers are reset each turn. */

interface VillagerProps {
  type: string;
  workers: number;
  resources: Resources;
  setResources: any;
  // likely can remove the remaining once refactored
  /* setResources: any;
  setWorkers: any;
  freeworkers: number;
  setFreeworkers: any; */
}

// @ts-ignore
export default function Villager(props: VillagerProps) {
  const handlePlusClick = (workerType: string) => {
    if (props.resources.freeworkers > 0) {
      // @ts-ignore
      const worker = props.resources[workerType];

      // TODO: Figure out why defense isn't working
      /* if (!worker) {
        // Defensive programming
        console.log("whoops");
        return;
      }
 */
      const updatedResources = { ...props.resources };
      // @ts-ignore
      updatedResources.freeworkers = updatedResources.freeworkers - 1;
      //@ts-ignore
      updatedResources[workerType] = updatedResources[workerType] + 1;

      props.setResources(updatedResources);
    } else {
      alert("No free workers!");
    }
  };

  const handleMinusClick = (workerType: string) => {
    //@ts-ignore
    if (props.resources[workerType] > 0) {
      // @ts-ignore
      const worker = props.resources[workerType];

      if (!worker) {
        // Defensive programming
        return;
      }

      const updatedResources = { ...props.resources };
      updatedResources.freeworkers = updatedResources.freeworkers + 1;
      // @ts-ignore
      updatedResources[workerType] = updatedResources[workerType] - 1;
      props.setResources(updatedResources);
    }
  };

  // TODO: break this into its own component so I just send "woodcutters" once
  return (
    <>
      <div className="villager">
        <button
          className="bg-white hover:bg-gray-100 text-gray-800 font-semibold py-1 px-2 border border-gray-400 rounded shadow"
          onClick={() => handlePlusClick("woodcutters")}
        >
          +1
        </button>
        <button
          className="bg-white hover:bg-gray-100 text-gray-800 font-semibold py-1 px-2 border border-gray-400 rounded shadow"
          onClick={() => handleMinusClick("woodcutters")}
        >
          -1
        </button>
        {props.type}: {props.workers}
      </div>
    </>
  );
}
