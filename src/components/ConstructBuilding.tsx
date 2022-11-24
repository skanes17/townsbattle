import React from "react";
import { Buildings } from "../types/Buildings";
import { Resources } from "../types/Resources";

interface ConstructBuildingProps {
  buildings: Buildings;
  setBuildings: any;
  buildingType: string;
  resources: Resources;
  setResources: any;
}

export default function ConstructBuilding({
  buildings,
  setBuildings,
  buildingType,
  resources,
  setResources,
}: ConstructBuildingProps) {
  const freeworkerCost = buildings[buildingType].freeworkerCost;
  const woodCost = buildings[buildingType]["woodCost"];
  const stoneCost = buildings[buildingType]["stoneCost"];
  const metalCost = buildings[buildingType]["metalCost"];

  // TODO: Toggle Build/Click as one button

  const handleBuildClick = (buildingType: string) => {
    if (
      buildings[buildingType].underConstruction === false &&
      resources.freeworkers >= freeworkerCost &&
      resources["wood"].collected >= woodCost &&
      resources["stone"].collected >= stoneCost &&
      resources["metal"].collected >= metalCost
    ) {
      // set the building to be constructed
      const updatedBuildings = { ...buildings };
      updatedBuildings[buildingType].underConstruction = true;
      setBuildings(updatedBuildings);

      // reduce the resources according to costs
      const updatedResources = { ...resources };
      updatedResources.freeworkers =
        updatedResources.freeworkers - freeworkerCost;
      updatedResources["wood"].collected =
        updatedResources["wood"].collected - woodCost;
      updatedResources["stone"].collected =
        updatedResources["stone"].collected - stoneCost;
      updatedResources["metal"].collected =
        updatedResources["metal"].collected - metalCost;
      setResources(updatedResources);
    } else {
      alert("Not enough resources!");
    }
  };

  const handleCancelClick = (buildingType: string) => {
    if (buildings[buildingType].underConstruction === true) {
      // cancel building construction
      const updatedBuildings = { ...buildings };
      updatedBuildings[buildingType].underConstruction = false;
      setBuildings(updatedBuildings);

      // give back resources
      const updatedResources = { ...resources };
      updatedResources.freeworkers =
        updatedResources.freeworkers + freeworkerCost;
      updatedResources["wood"].collected =
        updatedResources["wood"].collected + woodCost;
      updatedResources["stone"].collected =
        updatedResources["stone"].collected + stoneCost;
      updatedResources["metal"].collected =
        updatedResources["metal"].collected + metalCost;
      setResources(updatedResources);
    }
  };

  return (
    <>
      <div>
        {buildings[buildingType].name} Cost: {freeworkerCost}{" "}
        {freeworkerCost > 1 ? "workers " : "worker "}
        {woodCost > 0 ? `${woodCost} wood ` : ""}
        {stoneCost > 0 ? `${stoneCost} stone ` : ""}
        {metalCost > 0 ? `${metalCost} metal ` : ""}
      </div>
      <div className="unit">
        <button
          className="bg-white hover:bg-gray-100 text-gray-800 font-semibold py-1 px-2 border border-gray-400 rounded shadow"
          onClick={() => handleBuildClick(buildingType)}
        >
          Build
        </button>
        <button
          className="bg-white hover:bg-gray-100 text-gray-800 font-semibold py-1 px-2 border border-gray-400 rounded shadow"
          onClick={() => handleCancelClick(buildingType)}
        >
          Cancel
        </button>
        Under Construction:{" "}
        {buildings[buildingType].underConstruction ? "Yes" : "No"}
      </div>
    </>
  );
}
