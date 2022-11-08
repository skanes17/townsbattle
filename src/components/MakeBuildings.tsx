// @ts-nocheck
import React from "react";

export default function MakeBuildings({
  buildings,
  buildingName,
  buildingType,
  buildingPath,
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

  // TODO: Figure out how to remove the swordSmithy reference below
  // How to send as a prop??
  function handleBuildClick() {
    if (
      underConstruction === false &&
      resource1 >= resource1Cost &&
      resource2 >= resource2Cost
    ) {
      // TODO: Subtract resource costs
      const newBuildings = {
        ...buildings,
        swordSmithy: {
          ...buildingType,
          underConstruction: true,
        },
      };
      setBuildings(newBuildings);
      console.log(newBuildings);

      setResource1(resource1 - resource1Cost);
      setResource2(resource2 - resource2Cost);
    } else {
      alert("Not enough resources!");
    }
  }

  // TODO: Make this function!
  function handleCancelClick() {
    if (underConstruction === true) {
      const newBuildings = {
        ...buildings,
        swordSmithy: {
          ...buildingType,
          underConstruction: false,
        },
      };
      setBuildings(newBuildings);
      console.log(newBuildings);

      setResource1(resource1 + resource1Cost);
      setResource2(resource2 + resource2Cost);
    }
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
      </div>
    </>
  );
}
