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
      // TODO: Figure out how to replace the damn false with true
      /*       const buildingsCopy = { ...buildings };
      buildingsCopy.swordSmithy.underConstruction = "true";
      setBuildings(buildingsCopy); */
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
