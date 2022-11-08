import React from "react";
import { isPropertySignature } from "typescript";

// TODO: Create unit on End Turn click
// TODO: Figure out how to make it a choice between getting resources and making units
// TODO: Add units to the appropriate array based on the unitsInTraining - use a confirm button for now?

// @ts-ignore
export default function TrainUnits(props) {
  function handlePlusClick() {
    // each unit needs two different resources in order to be built
    if (
      props.resource1 >= props.resource1Cost &&
      props.resource2 >= props.resource2Cost
    ) {
      props.setUnitInTraining(props.unitInTraining + 1);
      // reduce the resources
      props.setResource1(props.resource1 - props.resource1Cost);
      props.setResource2(props.resource2 - props.resource2Cost);
    } else {
      alert("Not enough resources!");
    }
  }

  function handleMinusClick() {
    if (props.unitInTraining > 0) {
      props.setUnitInTraining(props.unitInTraining - 1);
      props.setResource1(props.resource1 + props.resource1Cost);
      props.setResource2(props.resource2 + props.resource2Cost);
    }
  }

  return (
    <>
      <div>
        {props.name} Cost: {props.resource1Cost} {props.resource1Name},{" "}
        {props.resource2Cost} {props.resource2Name}
      </div>
      <div className="unit">
        <button
          className="bg-white hover:bg-gray-100 text-gray-800 font-semibold py-1 px-2 border border-gray-400 rounded shadow"
          onClick={handlePlusClick}
        >
          +
        </button>
        <button
          className="bg-white hover:bg-gray-100 text-gray-800 font-semibold py-1 px-2 border border-gray-400 rounded shadow"
          onClick={handleMinusClick}
        >
          -
        </button>
        {props.name} units to train: {props.unitInTraining}
      </div>
    </>
  );
}
