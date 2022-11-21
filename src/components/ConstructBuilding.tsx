import React from "react";
import { Buildings } from "../types/Buildings";
import { Resources } from "../types/Resources";

interface ConstructBuildingProps {
  buildings: Buildings;
  setBuildings: any;
  buildingType: string;
  resources: Resources;
  setResources: any;
  /* index: number;
  resource1Name: "wood" | "stone" | "metal";
  resource2Name: "wood" | "stone" | "metal";
  resource3Name?: "wood" | "stone" | "metal";
  buildingName: string;
  freeworkers: number;
  setFreeworkers: any;
  freeworkerCost: number;
  resource1: number;
  resource2: number;
  resource3?: number;
  setResource1: any;
  setResource2: any;
  setResource3?: any;
  resource1Cost: number;
  resource2Cost: number;
  resource3Cost?: number;
  underConstruction: boolean; */
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
  // adjust later to accomodate sending state to UI

  const handleBuildClick = (buildingType: string) => {
    if (
      buildings[buildingType].underConstruction === false &&
      resources.freeworkers >= freeworkerCost &&
      resources.woodCollected >= woodCost &&
      resources.stoneCollected >= stoneCost &&
      resources.metalCollected >= metalCost
    ) {
      // set the building to be constructed
      const updatedBuildings = { ...buildings };
      updatedBuildings[buildingType].underConstruction = true;
      setBuildings(updatedBuildings);

      // reduce the resources according to costs
      const updatedResources = { ...resources };
      updatedResources.freeworkers =
        updatedResources.freeworkers - freeworkerCost;
      updatedResources.woodCollected =
        updatedResources.woodCollected - woodCost;
      updatedResources.stoneCollected =
        updatedResources.stoneCollected - stoneCost;
      updatedResources.metalCollected =
        updatedResources.metalCollected - metalCost;
      setResources(updatedResources);
    } else {
      alert("Not enough resources!");
    }
  };

  // TODO: Remove Build/Cancel mechanics for built buildings
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
      updatedResources.woodCollected =
        updatedResources.woodCollected + woodCost;
      updatedResources.stoneCollected =
        updatedResources.stoneCollected + stoneCost;
      updatedResources.metalCollected =
        updatedResources.metalCollected + metalCost;
    }
  };

  return (
    <>
      <div>
        {buildings[buildingType].name} Cost: {freeworkerCost}{" "}
        {freeworkerCost > 1 ? "villagers " : "villager "}
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
        Ready to construct:{" "}
        {buildings[buildingType].underConstruction ? "Yes" : "No"}
      </div>
    </>
  );
}
