import React, { useState } from "react";
import { BaseUnit } from "../types/BaseUnit";
import { Resources } from "../types/Resources";
import { UnitCosts } from "../types/UnitCosts";
import { UnitsInTraining } from "../types/UnitInTraining";
import CardName from "./CardName";
import CardShowCount from "./CardShowCount";
import CardSymbol from "./CardSymbol";
import CardTemplate from "./CardTemplate";
import HorizLine3ColGrid from "./HorizLine3ColGrid";
import AddRemoveButton from "./AddRemoveButton";

export interface TrainUnitCardProps {
  // TODO: Could use Unit["unitType"];
  unitType: string;
  resources: Resources;
  setResources: any;
  unitCosts: UnitCosts;
  unitsInTraining: UnitsInTraining;
  BASE_UNIT_DATA: BaseUnit;
  // TODO: Use more Types like this
  addTrainingUnit: (unitType: any, friendly: boolean) => void;
  removeTrainingUnit: any;
  friendly: boolean;
}

export default function TrainUnitCard({
  unitType,
  resources,
  setResources,
  unitCosts,
  unitsInTraining,
  BASE_UNIT_DATA,
  addTrainingUnit,
  removeTrainingUnit,
  friendly,
}: TrainUnitCardProps) {
  const freeworkerCost = unitCosts[unitType]["freeworkers"];
  const woodCost = unitCosts[unitType]["wood"];
  const stoneCost = unitCosts[unitType]["stone"];
  const metalCost = unitCosts[unitType]["metal"];

  const handleMinusClick = (unitType: string, friendly: boolean) => {
    // @ts-ignore
    if (unitsInTraining[unitType] > 0) {
      const updatedResources = { ...resources };
      updatedResources["freeworkers"] += freeworkerCost;
      updatedResources["wood"].collected += woodCost;
      updatedResources["stone"].collected += stoneCost;
      updatedResources["metal"].collected += metalCost;
      setResources(updatedResources);

      // updates the myTrainingUnits array as well
      removeTrainingUnit(unitType, friendly);
    }
  };

  const handlePlusClick = (unitType: string, friendly: boolean) => {
    // TODO: Refactor so no repeats; dynamic
    if (
      resources["freeworkers"] >= freeworkerCost &&
      resources["wood"].collected >= woodCost &&
      resources["stone"].collected >= stoneCost &&
      resources["metal"].collected >= metalCost
    ) {
      // reduce the resources according to costs
      const updatedResources = { ...resources };
      updatedResources["freeworkers"] -= freeworkerCost;
      updatedResources["wood"].collected -= woodCost;
      updatedResources["stone"].collected -= stoneCost;
      updatedResources["metal"].collected -= metalCost;
      setResources(updatedResources);

      // updates the myTrainingUnits array as well
      addTrainingUnit(unitType, friendly);
    } else {
      alert("Not enough resources!");
    }
  };

  return (
    <CardTemplate>
      <CardName cardName={BASE_UNIT_DATA[unitType].name} />
      <CardSymbol cardSymbol={BASE_UNIT_DATA[unitType].nameSymbol} />
      <HorizLine3ColGrid />

      <div className="col-span-3 flex justify-start pl-2 align-middle font-bold">
        Cost
      </div>

      {/* TODO: Improve the uses of ternary operator below */}
      <div className="col-span-3 flex justify-center align-middle">
        {freeworkerCost > 0 ? `🛠️${freeworkerCost} ` : ""}
        {woodCost > 0 ? `🪵${woodCost} ` : ""}
        {stoneCost > 0 ? `🪨${stoneCost} ` : ""}
        {metalCost > 0 ? `🔩${metalCost} ` : ""}
      </div>

      <div className="flex items-center justify-end">
        <AddRemoveButton
          buttonType="minus"
          onClick={() => handleMinusClick(unitType, friendly)}
        >
          -1
        </AddRemoveButton>
      </div>

      {/* @ts-ignore */}
      <CardShowCount countToShow={unitsInTraining[unitType]} />

      <div className="flex items-center justify-start">
        <AddRemoveButton
          buttonType="plus"
          onClick={() => handlePlusClick(unitType, friendly)}
        >
          +1
        </AddRemoveButton>
      </div>
    </CardTemplate>
  );
}

/* --OLD CODE-- */
{
  /* <>
  <div> */
}
{
  /* TODO: Make a card for this. Refactor first... maybe. */
}
/*  {unitType === "melee" ? "🗡️ Melee " : ""}
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
    {unitType === "tanky" ? "🛡️ Tanky " : ""} */
{
  /* @ts-ignore */
}
/* units to train: {unitsInTraining[unitType]}
  </div>
</>; */
