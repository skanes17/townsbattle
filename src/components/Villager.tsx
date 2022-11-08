import React, { useState } from "react";

/* TODO: Consider if it would be cleaner to ditch villagers and harvest a resource per click.
Could have a limit on clicks (energy bar, actions available, etc), each click uses energy.
Basically the same result since villagers are reset each turn. */

// @ts-ignore
export default function Villager(props) {
  /* TODO: Rewrite this so workers are reset each turn */
  /* TODO: Ask how to update state of a props within a child */

  // when a worker is added to this building they're taken from the freeworker pool
  function handlePlusClick() {
    if (props.freeworkers > 0) {
      props.setWorkers(props.workers + 1);
      // needed the () here to call it
      props.setFreeworkers(props.freeworkers - 1);
    }
  }

  // when a worker is taken from this building they return to the freeworker pool
  function handleMinusClick() {
    if (props.workers > 0) {
      props.setWorkers(props.workers - 1);
      props.setFreeworkers(props.freeworkers + 1);
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
