import React, { useState } from "react";

// @ts-ignore
export default function Building(props) {
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
      <div className="building">
        {/* display the current type and number of */}
        <button onClick={handlePlusClick}>+</button>
        <button onClick={handleMinusClick}>-</button>
        {props.type}: {props.workers}
      </div>
    </>
  );
}
