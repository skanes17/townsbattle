import React, { useState } from "react";
import { BaseUnit } from "../types/BaseUnit";
import { Resources } from "../types/Resources";
import { Unit } from "../types/Unit";
import { UnitCosts } from "../types/UnitCosts";
import { UnitsInTraining } from "../types/UnitInTraining";
import AddUnitButton from "./AddUnitButton";

export interface TrainUnitsProps {
  // TODO: Improve use of name below by incorporating the myUnits structure (nested)
  unitType: string;
  resources: Resources;
  setResources: any;
  unitCosts: UnitCosts;
  unitsInTraining: UnitsInTraining;
  /*   setUnitsInTraining: any;
   */ BASE_UNIT_DATA: BaseUnit;
  addTrainingUnit: any;
  removeTrainingUnit: any;
  /* addUnit: any;
  removeUnit: any; */
  friendly: boolean;
}

// TODO: Create unit on End Turn click
// TODO: Add units to the appropriate array based on the unitsInTraining

export default function TrainUnits({
  unitType,
  resources,
  setResources,
  unitCosts,
  unitsInTraining,
  addTrainingUnit,
  removeTrainingUnit,
  friendly,
}: TrainUnitsProps) {
  const freeworkerCost = unitCosts[unitType].freeworker;
  const woodCost = unitCosts[unitType]["wood"];
  const stoneCost = unitCosts[unitType]["stone"];
  const metalCost = unitCosts[unitType]["metal"];

  const handlePlusClick = (unitType: string) => {
    // TODO: Later, see if these can be combined into one which checks all resources in resources object
    if (
      resources.freeworkers >= freeworkerCost &&
      resources["wood"].collected >= woodCost &&
      resources["stone"].collected >= stoneCost &&
      resources["metal"].collected >= metalCost
    ) {
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

  const handleMinusClick = (unitType: string) => {
    // @ts-ignore
    if (unitsInTraining[unitType] > 0) {
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

  // TODO: Improve the uses of ternary operator below
  return (
    <>
      <div>
        {unitType === "melee" ? "🗡️ Melee " : ""}
        {unitType === "pewpew" ? "🏹 Pewpew " : ""}
        {unitType === "tanky" ? "🛡️ Tanky " : ""} Cost: {freeworkerCost}{" "}
        {freeworkerCost > 1 ? "workers " : "worker "}
        {woodCost > 0 ? `${woodCost} wood ` : ""}
        {stoneCost > 0 ? `${stoneCost} stone ` : ""}
        {metalCost > 0 ? `${metalCost} metal ` : ""}
      </div>
      <div>
        <button
          className="bg-white hover:bg-gray-100 text-gray-800 font-semibold py-1 px-2 border border-gray-400 rounded shadow"
          onClick={() => {
            handlePlusClick(unitType);
            // updates the myUnitsArray as well
            addTrainingUnit(unitType, friendly);
          }}
        >
          +1
        </button>
        <button
          className="bg-white hover:bg-gray-100 text-gray-800 font-semibold py-1 px-2 border border-gray-400 rounded shadow"
          onClick={() => {
            handleMinusClick(unitType);
            removeTrainingUnit(unitType, friendly);
          }}
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
