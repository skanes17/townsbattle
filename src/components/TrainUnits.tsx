import React from "react";
import { isPropertySignature } from "typescript";
import AddUnitButton from "./AddUnitButton";

// TODO: Create unit on End Turn click
// TODO: Figure out how to make it a choice between getting resources and making units
// TODO: Add units to the appropriate array based on the unitsInTraining - use a confirm button for now?

// @ts-ignore
export default function TrainUnits(props) {
  function handlePlusClick() {
    // each unit needs two different resources in order to be built
    if (props.resource1 > 1 && props.resource2 > 1) {
      props.setUnitInTraining(props.unitInTraining + 1);
      // reduce the resources
      props.setResource1(props.resource1 - 2);
      props.setResource2(props.resource2 - 2);
    }
  }

  function handleMinusClick() {
    if (props.unitInTraining > 0) {
      props.setUnitInTraining(props.unitInTraining - 1);
      props.setResource1(props.resource1 + 2);
      props.setResource2(props.resource2 + 2);
    }
  }

  return (
    <>
      <div>
        {props.name} Cost: 2 {props.resource1Name}, 2 {props.resource2Name}
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

// REFERENCE FOR COSTS FROM GAME
/* const [unitCosts, setUnitCosts] = useState({
    melee: {
      woodCost: 2,
      stoneCost: 2,
      ironCost: 0,
    },
    pewpew: {
      woodCost: 2,
      stoneCost: 0,
      ironCost: 2,
    },
    tanky: {
      woodCost: 0,
      stoneCost: 2,
      iron: 2,
    },
  }); */
