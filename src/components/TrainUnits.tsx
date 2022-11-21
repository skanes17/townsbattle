import React from "react";
import { Resources } from "../types/Resources";
import { UnitCosts } from "../types/UnitCosts";
import { UnitsInTraining } from "../types/UnitInTraining";

export interface TrainUnitsProps {
  // TODO: Improve use of name below by incorporating the myUnits structure (nested)
  name: "🗡️ Melee" | "🏹 Pewpew" | "🛡️ Tanky";
  unitType: string;
  resources: Resources;
  setResources: any;
  unitCosts: UnitCosts;
  unitsInTraining: UnitsInTraining;
  setUnitsInTraining: any;
}

// TODO: Create unit on End Turn click
// TODO: Add units to the appropriate array based on the unitsInTraining

// @ts-ignore
export default function TrainUnits({
  name,
  unitType,
  resources,
  setResources,
  unitCosts,
  unitsInTraining,
  setUnitsInTraining,
}: TrainUnitsProps) {
  const freeworkerCost = unitCosts[unitType].freeworkerCost;
  const woodCost = unitCosts[unitType]["woodCost"];
  const stoneCost = unitCosts[unitType]["stoneCost"];
  const metalCost = unitCosts[unitType]["metalCost"];

  const handlePlusClick = (unitType: string) => {
    // TODO: Later, see if these can be combined into one which checks all resources in resources object
    if (
      resources.freeworkers >= freeworkerCost &&
      resources.woodCollected >= woodCost &&
      resources.stoneCollected >= stoneCost &&
      resources.metalCollected >= metalCost
    ) {
      // train an extra unit of appropriate type
      const updatedTrainees = { ...unitsInTraining };
      // @ts-ignore
      updatedTrainees[unitType] = updatedTrainees[unitType] + 1;
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

  const handleMinusClick = (unitType: string) => {
    // @ts-ignore
    if (unitsInTraining[unitType] > 0) {
      // train one less unit of appropriate type
      const updatedTrainees = { ...unitsInTraining };
      // @ts-ignore
      updatedTrainees[unitType] = updatedTrainees[unitType] - 1;
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

  // TODO: Improve the uses of ternary operator below
  return (
    <>
      <div>
        {unitType === "melee" ? "🗡️ Melee " : ""}
        {unitType === "pewpew" ? "🏹 Pewpew " : ""}
        {unitType === "tanky" ? "🛡️ Tanky " : ""} Cost: {freeworkerCost}{" "}
        {freeworkerCost > 1 ? "villagers " : "villager "}
        {woodCost > 0 ? `${woodCost} wood ` : ""}
        {stoneCost > 0 ? `${stoneCost} stone ` : ""}
        {metalCost > 0 ? `${metalCost} metal ` : ""}
      </div>
      <div>
        <button
          className="bg-white hover:bg-gray-100 text-gray-800 font-semibold py-1 px-2 border border-gray-400 rounded shadow"
          onClick={() => handlePlusClick(unitType)}
        >
          +1
        </button>
        <button
          className="bg-white hover:bg-gray-100 text-gray-800 font-semibold py-1 px-2 border border-gray-400 rounded shadow"
          onClick={() => handleMinusClick(unitType)}
        >
          -1
        </button>
        {unitType === "melee" ? "🗡️ Melee " : ""}
        {unitType === "pewpew" ? "🏹 Pewpew " : ""}
        {unitType === "tanky" ? "🛡️ Tanky " : ""}
        {/* @ts-ignore */}
        units to train: {unitsInTraining[unitType]}
      </div>
    </>
  );
}
