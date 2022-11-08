import React from "react";

export default function MakeBuildings() {
  // build basic buildings code here, similar to villagers and units
  // reimagine so building either exists or doesn't exist
  // maybe set a toggle for true/false instead of increment
  // can adjust later to accomodate sending state to UI
}

// ===REFERENCE===
/* function handlePlusClick() {
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
); */
