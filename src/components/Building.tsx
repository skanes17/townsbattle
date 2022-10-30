import React, { useState } from "react";

// @ts-ignore
export default function Building(props) {
  /* TODO: Rewrite this so workers are reset each turn */
  /* TODO: Ask how to update state of a props within a child */

  // set the initial number of workers on this building to 0
  const [worker, setWorker] = useState(0);

  // when a worker is added to this building they're taken from the freeworker pool
  function handlePlusClick() {
    if (props.freeworkers > 0) {
      setWorker(worker + 1);
      // needed the () here to call it
      props.lessFreeworkers();
    }
  }

  // when a worker is taken from this building they return to the freeworker pool
  function handleMinusClick() {
    if (worker > 0) {
      setWorker(worker - 1);
      props.moreFreeworkers();
    }
  }

  return (
    <>
      <div>
        {/* display the current type and number of workers */}
        {props.type}: {worker}
      </div>
      <button onClick={handlePlusClick}>+</button>
      <button onClick={handleMinusClick}>-</button>
    </>
  );
}
