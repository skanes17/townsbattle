import React from "react";

export default function MakeBuildings() {
  // build basic buildings code here, similar to villagers and units
  // adjust later to accomodate sending state to UI

  function handleBuildClick() {
    // each unit needs two different resources in order to be built
    if (
      props.resource1 > props.resource1Cost &&
      props.resource2 > props.resource2Cost
    ) {
      // make a copy of buildings object, modify it, set it back to state
      const buildingsCopy = { ...buildings };
      buildingsCopy.swordSmithy.underConstruction = "true";
      setBuildings(buildingsCopy);

      // TODO: Consider creating this function in Game and calling it here to update the state
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
          onClick={handleBuildClick}
        >
          +
        </button>
        <button
          className="bg-white hover:bg-gray-100 text-gray-800 font-semibold py-1 px-2 border border-gray-400 rounded shadow"
          onClick={handleCancelClick}
        >
          -
        </button>
        {props.name} is ready to construct:{" "}
        {props.underConstruction ? "Yes" : "No"}
        {/* put Yes or No here */}
      </div>
    </>
  );
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
        Build
      </button>
      <button
        className="bg-white hover:bg-gray-100 text-gray-800 font-semibold py-1 px-2 border border-gray-400 rounded shadow"
        onClick={handleMinusClick}
      >
        Cancel
      </button>
      {props.name} units to train: {props.unitInTraining}
    </div>
  </>
); */
