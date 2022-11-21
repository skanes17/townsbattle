import { resourceUsage } from "process";
import React from "react";
import { isPropertySignature } from "typescript";
import { Resources } from "../types/Resources";
import { UnitCosts } from "../types/UnitCosts";
import { UnitsInTraining } from "../types/UnitInTraining";

export interface TrainUnitsProps {
  name: "🗡️ Melee" | "🏹 Pewpew" | "🛡️ Tanky";
  // TODO: replace with take name on button as prop
  freeworkerName: any; // adjust later if necessary
  resources: Resources;
  setResources: any;
  unitCosts: UnitCosts;
  setUnitCosts: any;
  unitsInTraining: UnitsInTraining;
  setUnitsInTraining: any;
  // TODO: Set resources during call from button
  /* resource1Name:"wood" | "stone" | "metal",
  resource1: number,
  resource2Name:"wood" | "stone" | "metal",
  resource2:number,
  setResource2={setStoneCollected}
  unitInTraining={meleeInTraining}
  setUnitInTraining={setMeleeInTraining} */
} // TODO: Fix this later!

// TODO: Create unit on End Turn click
// TODO: Figure out how to make it a choice between getting resources and making units
// TODO: Add units to the appropriate array based on the unitsInTraining - use a confirm button for now?

// @ts-ignore
export default function TrainUnits({
  name,
  freeworkerName,
  resources,
  setResources,
  unitCosts,
  setUnitCosts,
  unitsInTraining,
  setUnitsInTraining,
}: TrainUnitsProps) {
  const freeworkerCost = unitCosts["melee"].freeworkerCost;
  const woodCost = unitCosts["melee"]["woodCost"];
  const stoneCost = unitCosts["melee"]["stoneCost"];
  const metalCost = unitCosts["melee"]["metalCost"];

  const handlePlusClick = () => {
    // TODO: Later, see if these can be combined into one which checks all resources in resources object
    if (
      resources.freeworkers >= freeworkerCost &&
      resources.woodCollected >= woodCost &&
      resources.stoneCollected >= stoneCost &&
      resources.metalCollected >= metalCost
    ) {
      // train an extra unit of appropriate type
      const updatedTrainees = { ...unitsInTraining };
      updatedTrainees["melee"] = updatedTrainees["melee"] + 1;
      setUnitsInTraining(updatedTrainees);

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

  const handleMinusClick = () => {
    if (unitsInTraining["melee"] > 0) {
      // train one less unit of appropriate type
      const updatedTrainees = { ...unitsInTraining };
      updatedTrainees["melee"] = updatedTrainees["melee"] - 1;
      setUnitsInTraining(updatedTrainees);

      const updatedResources = { ...resources };
      updatedResources.freeworkers =
        updatedResources.freeworkers + freeworkerCost;
      updatedResources.woodCollected =
        updatedResources.woodCollected + woodCost;
      updatedResources.stoneCollected =
        updatedResources.stoneCollected + stoneCost;
      updatedResources.metalCollected =
        updatedResources.metalCollected + metalCost;
      setResources(updatedResources);
    }
  };

  return (
    <>
      <div>
        {name} Cost: {freeworkerCost}{" "}
        {freeworkerCost > 1 ? "villagers" : "villager"},{" "}
        {woodCost > 0 ? `${woodCost} wood ` : ""}
        {stoneCost > 0 ? `${stoneCost} stone ` : ""}
        {metalCost > 0 ? `${metalCost} metal ` : ""}
      </div>
      <div className="unit">
        <button
          className="bg-white hover:bg-gray-100 text-gray-800 font-semibold py-1 px-2 border border-gray-400 rounded shadow"
          onClick={handlePlusClick}
        >
          +1
        </button>
        <button
          className="bg-white hover:bg-gray-100 text-gray-800 font-semibold py-1 px-2 border border-gray-400 rounded shadow"
          onClick={handleMinusClick}
        >
          -1
        </button>
        {name} units to train: {unitsInTraining["melee"]}
      </div>
    </>
  );
}
