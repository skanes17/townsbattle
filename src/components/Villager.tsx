import React, { useState } from "react";
import { Resources } from "../types/Resources";

/* TODO: Consider if it would be cleaner to ditch villagers and harvest a resource per click.
Could have a limit on clicks (energy bar, actions available, etc), each click uses energy.
Basically the same result since villagers are reset each turn. */

interface VillagerProps {
  type: string;
  workers: number;
  resources: Resources;
  // likely can remove the remaining once refactored
  setResources: any;
  setWorkers: any;
  freeworkers: number;
  setFreeworkers: any;
}

// @ts-ignore
export default function Villager(props: VillagerProps) {
  // when a worker is added to this building they're taken from the freeworker pool
  function handlePlusClick() {
    // needed the () here to call it

    if (props.resources.freeworkers > 0) {
      props.setWorkers(props.workers + 1);

      // TODO: Pick up from here -- use Devin's base unit button concept to help

      const updatedResources = { ...props.resources };
      updatedResources.freeworkers = updatedResources.freeworkers - 1;
      updatedResources.freeworkers = updatedResources.freeworkers - 1;
      props.setFreeworkers(updatedResources);
    } else {
      alert("No free workers!");
    }
  }

  // when a worker is taken from this building they return to the freeworker pool
  function handleMinusClick() {
    if (props.workers > 0) {
      props.setWorkers(props.workers - 1);
      const updatedResources = { ...props.resources };
      updatedResources.freeworkers = updatedResources.freeworkers + 1;
      props.setFreeworkers(updatedResources);
    }
  }

  return (
    <>
      <div className="villager">
        <button
          className="bg-white hover:bg-gray-100 text-gray-800 font-semibold py-1 px-2 border border-gray-400 rounded shadow"
          onClick={handlePlusClick}
        >
          +1
        </button>
        <button
          className="bg-white hover:bg-gray-100 text-gray-800 font-semibold py-1 px-2 border border-gray-400 rounded shadow"
          onClick={handleMinusClick}
        >
          -1
        </button>
        {props.type}: {props.workers}
      </div>
    </>
  );
}
