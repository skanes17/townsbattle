import React, { useState } from "react";
import { BaseUnit } from "../../types/BaseUnit";
import { Resources } from "../../types/Resources";
import { UnitCosts } from "../../types/UnitCosts";
import { UnitsInTraining } from "../../types/UnitInTraining";
import CardShowCount from "./CardShowCount";
import CardSymbol from "./CardSymbol";
import CardTemplate from "./CardTemplate";
import HorizLine3ColGrid from "./HorizLine3ColGrid";
import AddRemoveButton from "../buttons/AddRemoveButton";
import TrainUnitCardHeader from "./TrainUnitCardName";
import CardDescription from "./CardDescription";

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
      <TrainUnitCardHeader
        cardName={BASE_UNIT_DATA[unitType].name}
        attack={BASE_UNIT_DATA[unitType].attack}
        health={BASE_UNIT_DATA[unitType].health}
      ></TrainUnitCardHeader>
      <CardSymbol cardSymbol={BASE_UNIT_DATA[unitType].nameSymbol} />
      <CardDescription descriptionText={BASE_UNIT_DATA[unitType].description} />
      <div className="col-span-3 flex justify-start pl-2 align-middle font-bold">
        Cost
      </div>
      {/* TODO: Improve the uses of ternary operator below */}
      <div className="col-span-3 flex justify-center align-middle text-lg">
        {freeworkerCost > 0 ? `🛠️${freeworkerCost} ` : ""}
        {woodCost > 0 ? `🪵${woodCost} ` : ""}
        {stoneCost > 0 ? `🪨${stoneCost} ` : ""}
        {metalCost > 0 ? `🔩${metalCost} ` : ""}
      </div>
      <div className="flex items-center justify-end">
        <AddRemoveButton
          buttonColor="red"
          onClick={() => handleMinusClick(unitType, friendly)}
        >
          -1
        </AddRemoveButton>
      </div>
      {/* @ts-ignore */}
      <CardShowCount countToShow={unitsInTraining[unitType]} />
      <div className="flex items-center justify-start">
        <AddRemoveButton
          buttonColor="blue"
          onClick={() => handlePlusClick(unitType, friendly)}
        >
          +1
        </AddRemoveButton>
      </div>
    </CardTemplate>
  );
}
