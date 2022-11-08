// @ts-nocheck
import React from "react";

export default function MakeBuildings({
  buildings,
  buildingName,
  /*   buildingType, */
  setBuildings,
  resource1Name,
  resource1,
  setResource1,
  resource1Cost,
  resource2Name,
  resource2,
  setResource2,
  resource2Cost,
  underConstruction,
}) {
  // build basic buildings code here, similar to villagers and units
  // adjust later to accomodate sending state to UI

  // TODO: Remove the reference to swordSmithy below; make it sent as a prop!
  function handleBuildClick() {
    if (resource1 >= resource1Cost && resource2 >= resource2Cost) {
      // TODO: Subtract resource costs
      const newBuildings = {
        ...buildings,
        swordSmithy: {
          ...buildings.swordSmithy,
          underConstruction: true,
        },
      };
      setBuildings(newBuildings);
    } else {
      alert("Not enough resources!");
    }
  }

  // TODO: Make this function!
  function handleCancelClick() {
    /* if (resource1 > resource1Cost && resource2 > resource2Cost) {

      const buildingsCopy = { ...buildings };
      const newBuildings = {
        ...buildings,
        buildingType: {
          ...building.buildingType,
          underConstruction: true,
        },
      };
      setBuildings(newBuildings);
    } */
  }

  return (
    <>
      <div>
        {buildingName} Cost: {resource1Cost} {resource1Name}, {resource2Cost}{" "}
        {resource2Name}
      </div>
      <div className="unit">
        <button
          className="bg-white hover:bg-gray-100 text-gray-800 font-semibold py-1 px-2 border border-gray-400 rounded shadow"
          onClick={handleBuildClick}
        >
          Build
        </button>
        <button
          className="bg-white hover:bg-gray-100 text-gray-800 font-semibold py-1 px-2 border border-gray-400 rounded shadow"
          onClick={handleCancelClick}
        >
          Cancel
        </button>
        {buildingName} is ready to construct: {underConstruction ? "Yes" : "No"}
        {/* put Yes or No here */}
      </div>
    </>
  );
}
