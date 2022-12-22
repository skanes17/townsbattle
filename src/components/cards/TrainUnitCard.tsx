import React, { useState } from "react";
import { BaseUnit } from "../../types/BaseUnit";
import { Resources } from "../../types/Resources";
import { UnitCosts } from "../../types/UnitCosts";
import CardShowCount from "./CardShowCount";
import CardSymbol from "./CardSymbol";
import CardTemplate from "./CardTemplate";
import HorizLine3ColGrid from "./HorizLine3ColGrid";
import AddRemoveButton from "../buttons/AddRemoveButton";
import TrainUnitCardHeader from "./TrainUnitCardHeader";
import CardDescription from "./CardDescription";
import { UnitCounts } from "../../types/UnitCounts";

export interface TrainUnitCardProps {
  // TODO: Could use Unit["unitType"];
  unitType: string;
  resources: Resources;
  setResources: any;
  unitCosts: UnitCosts;
  unitsInTraining: UnitCounts;
  BASE_UNIT_DATA: BaseUnit;
  // TODO: Use more Types like this
  addTrainingUnit: (unitType: any, friendly: boolean) => void;
  maxTrainingUnits: any;
  removeTrainingUnit: any;
  removeAllTrainingUnits: any;
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
  maxTrainingUnits,
  removeTrainingUnit,
  removeAllTrainingUnits,
  friendly,
}: TrainUnitCardProps) {
  const freeworkerCost = unitCosts[unitType]["freeworkers"];
  const woodCost = unitCosts[unitType]["wood"];
  const stoneCost = unitCosts[unitType]["stone"];
  const metalCost = unitCosts[unitType]["metal"];

  const handleZeroClick = (unitType: string, friendly: boolean) => {
    // @ts-ignore
    if (unitsInTraining[unitType] > 0) {
      const updatedResources = { ...resources };
      updatedResources["freeworkers"].collected +=
        // @ts-ignore
        freeworkerCost * unitsInTraining[unitType];
      updatedResources["wood"].collected +=
        // @ts-ignore
        woodCost * unitsInTraining[unitType];
      updatedResources["stone"].collected +=
        // @ts-ignore
        stoneCost * unitsInTraining[unitType];
      updatedResources["metal"].collected +=
        // @ts-ignore
        metalCost * unitsInTraining[unitType];
      setResources(updatedResources);

      // updates the myTrainingUnits array as well
      removeAllTrainingUnits(unitType, friendly);
    }
  };

  const handleMinusClick = (unitType: string, friendly: boolean) => {
    // @ts-ignore
    if (unitsInTraining[unitType] > 0) {
      const updatedResources = { ...resources };
      updatedResources["freeworkers"].collected += freeworkerCost;
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
      resources["freeworkers"].collected >= freeworkerCost &&
      resources["wood"].collected >= woodCost &&
      resources["stone"].collected >= stoneCost &&
      resources["metal"].collected >= metalCost
    ) {
      // reduce the resources according to costs
      const updatedResources = { ...resources };
      updatedResources["freeworkers"].collected -= freeworkerCost;
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

  const handleMaxClick = (unitType: string, friendly: boolean) => {
    // FIXME: Doesn't work if one a resource COST is zero, even if that resource isn't required

    // check all costs and see that at least one unit can be afforded
    const maxTrainable = Math.min(
      Math.floor(resources["freeworkers"].collected / freeworkerCost),
      Math.floor(resources["wood"].collected / woodCost),
      Math.floor(resources["stone"].collected / stoneCost),
      Math.floor(resources["metal"].collected / metalCost)
    );

    if (maxTrainable > 0) {
      const updatedResources = { ...resources };
      updatedResources["freeworkers"].collected -=
        freeworkerCost * maxTrainable;
      updatedResources["wood"].collected -= woodCost * maxTrainable;
      updatedResources["stone"].collected -= stoneCost * maxTrainable;
      updatedResources["metal"].collected -= metalCost * maxTrainable;
      setResources(updatedResources);

      maxTrainingUnits(unitType, friendly, maxTrainable);
    } else {
      alert("Not enough resources!");
    }
  };

  // FIXME: currently unused
  const redCost = "text-red-600";
  const greenCost = "text-green-500";

  return (
    <CardTemplate>
      <TrainUnitCardHeader
        cardName={BASE_UNIT_DATA[unitType].name}
        attack={BASE_UNIT_DATA[unitType].attack}
        health={BASE_UNIT_DATA[unitType].maxHealth}
      ></TrainUnitCardHeader>
      <CardSymbol cardSymbol={BASE_UNIT_DATA[unitType].nameSymbol} />
      <CardDescription descriptionText={BASE_UNIT_DATA[unitType].description} />
      <div className="col-span-3 flex justify-start pl-2 align-middle font-bold">
        Cost
      </div>
      <div className="col-span-3 flex justify-center align-middle text-lg">
        {Object.keys(resources).map(
          (resourceType) =>
            /* @ts-ignore */
            unitCosts[unitType][resourceType] > 0 && (
              <span>
                {/* @ts-ignore */}
                {resources[resourceType].resourceSymbol}
                {/* @ts-ignore */}
                {unitCosts[unitType][resourceType]}{" "}
              </span>
            )
        )}
      </div>
      <div className="col-span-3 grid auto-cols-min grid-cols-5 gap-1">
        <div className="flex items-center justify-center">
          <AddRemoveButton
            buttonType="remove"
            onClick={() => handleZeroClick(unitType, friendly)}
          >
            Zero
          </AddRemoveButton>
        </div>
        <div className="flex items-center justify-center">
          <AddRemoveButton
            buttonType="remove"
            onClick={() => handleMinusClick(unitType, friendly)}
          >
            -
          </AddRemoveButton>
        </div>
        {/* @ts-ignore */}
        <CardShowCount countToShow={unitsInTraining[unitType]} />
        <div className="flex items-center justify-center">
          <AddRemoveButton
            buttonType="add"
            onClick={() => handlePlusClick(unitType, friendly)}
          >
            +
          </AddRemoveButton>
        </div>
        <div className="flex items-center justify-center">
          <AddRemoveButton
            buttonType="add"
            onClick={() => handleMaxClick(unitType, friendly)}
          >
            Max
          </AddRemoveButton>
        </div>
      </div>
    </CardTemplate>
  );
}
