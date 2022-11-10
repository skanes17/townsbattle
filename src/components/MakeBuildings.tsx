// @ts-nocheck
import React from "react";

export default function MakeBuildings({
  index,
  buildings,
  buildingName,
  setBuildings,
  freeworkerName,
  freeworkers,
  freeworkerCost,
  setFreeworkers,
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
  // TODO: Toggle Build/Click as one button
  // adjust later to accomodate sending state to UI

  function handleBuildClick() {
    if (
      underConstruction === false &&
      freeworkers > 0 &&
      resource1 >= resource1Cost &&
      resource2 >= resource2Cost
    ) {
      // TODO: Replace this with array approach
      const buildingsCopy = [...buildings];
      buildingsCopy[index].underConstruction = true;

      // CONTINUE FROM HERE!

      setBuildings(buildingsCopy);
      console.log(buildingsCopy);

      setFreeworkers(freeworkers - freeworkerCost);
      setResource1(resource1 - resource1Cost);
      setResource2(resource2 - resource2Cost);
    } else {
      alert("Not enough resources!");
    }
  }

  // TODO: Make it impossible to build/cancel the building once the turn has ended
  function handleCancelClick() {
    if (underConstruction === true) {
      const buildingsCopy = [...buildings];
      buildingsCopy[index].underConstruction = false;
      setBuildings(buildingsCopy);
      console.log(buildingsCopy);

      setFreeworkers(freeworkers + freeworkerCost);
      setResource1(resource1 + resource1Cost);
      setResource2(resource2 + resource2Cost);
    }
  }

  return (
    <>
      <div>
        {buildingName} Cost: {freeworkerCost} {freeworkerName}, {resource1Cost}{" "}
        {resource1Name}, {resource2Cost} {resource2Name}
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
