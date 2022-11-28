import React, { useState } from "react";
import { BaseUnit } from "../types/BaseUnit";
import { Resources } from "../types/Resources";
import { UnitCosts } from "../types/UnitCosts";
import { UnitsInTraining } from "../types/UnitInTraining";

export interface TrainUnitsProps {
  // TODO: Could use Unit["unitType"];
  unitType: string;
  resources: Resources;
  setResources: any;
  unitCosts: UnitCosts;
  unitsInTraining: UnitsInTraining;
  /*   setUnitsInTraining: any;
   */ BASE_UNIT_DATA: BaseUnit;
  // TODO: Use more Types like this
  addTrainingUnit: (unitType: any, friendly: boolean) => void;
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
  const freeworkerCost = unitCosts[unitType]["freeworkers"];
  const woodCost = unitCosts[unitType]["wood"];
  const stoneCost = unitCosts[unitType]["stone"];
  const metalCost = unitCosts[unitType]["metal"];

  const handlePlusClick = (unitType: string, friendly: boolean) => {
    // TODO: Refactor so no repeats, dynamic
    if (
      resources["freeworkers"] >= freeworkerCost &&
      resources["wood"].collected >= woodCost &&
      resources["stone"].collected >= stoneCost &&
      resources["metal"].collected >= metalCost
    ) {
      // reduce the resources according to costs
      const updatedResources = { ...resources };
      updatedResources["freeworkers"] =
        updatedResources["freeworkers"] - freeworkerCost;
      updatedResources["wood"].collected =
        updatedResources["wood"].collected - woodCost;
      updatedResources["stone"].collected =
        updatedResources["stone"].collected - stoneCost;
      updatedResources["metal"].collected =
        updatedResources["metal"].collected - metalCost;
      setResources(updatedResources);

      // updates the myTrainingUnits array as well
      addTrainingUnit(unitType, friendly);
    } else {
      alert("Not enough resources!");
    }
  };

  const handleMinusClick = (unitType: string, friendly: boolean) => {
    // @ts-ignore
    if (unitsInTraining[unitType] > 0) {
      const updatedResources = { ...resources };
      updatedResources["freeworkers"] =
        updatedResources["freeworkers"] + freeworkerCost;
      updatedResources["wood"].collected =
        updatedResources["wood"].collected + woodCost;
      updatedResources["stone"].collected =
        updatedResources["stone"].collected + stoneCost;
      updatedResources["metal"].collected =
        updatedResources["metal"].collected + metalCost;
      setResources(updatedResources);

      // updates the myTrainingUnits array as well
      removeTrainingUnit(unitType, friendly);
    }
  };

  // TODO: Fix resources not working properly during training

  // TODO: Improve the uses of ternary operator below
  return (
    <>
      <div>
        {/* TODO: Make a card for this. Refactor first... maybe. */}
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
            handlePlusClick(unitType, friendly);
          }}
        >
          +1
        </button>
        <button
          className="bg-white hover:bg-gray-100 text-gray-800 font-semibold py-1 px-2 border border-gray-400 rounded shadow"
          onClick={() => {
            handleMinusClick(unitType, friendly);
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

/* return (
  <div className="p-4 border border-blue-900">
    <div className="font-bold">Assign Train Units</div>

    <div className="flex space-x-2">
      {Object.keys(resources)
        .filter((key) => key != "freeworkers")
        .map((resourceType: string) => (
          <Worker
            resources={resources}
            setResources={setResources}
            resourceType={resourceType}
          />
        ))}
    </div>
  </div>
); */
