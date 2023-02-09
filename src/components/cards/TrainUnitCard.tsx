import React, { useState } from "react";
import {
  BaseUnit,
  Resources,
  ResourceType,
  UnitCosts,
  UnitCounts,
  UnitType,
} from "../../types/";
import {
  CardShowCount,
  CardSymbol,
  CardTemplate,
  TrainUnitCardHeader,
  CardDescription,
} from "../cards";
import { AddRemoveButton } from "../buttons";
import { AddRemoveUnitFn, MaxTrainingUnitsFn } from "../../types";

export interface TrainUnitCardProps {
  // TODO: Could use Unit["unitType"];
  unitType: UnitType;
  resources: Resources;
  setResources: (resources: Resources) => void;
  unitCosts: UnitCosts;
  unitsInTraining: UnitCounts;
  BASE_UNIT_DATA: BaseUnit;
  addTrainingUnit: AddRemoveUnitFn;
  maxTrainingUnits: MaxTrainingUnitsFn;
  removeTrainingUnit: AddRemoveUnitFn;
  removeAllTrainingUnits: AddRemoveUnitFn;
  friendly: boolean;
}

// maxTrainingUnits(unitType, friendly, maxTrainable);

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

  // function checks how many of each resource type is collected vs. the resources required for that unit, add/reduces them as necessary
  const updateResources = (
    resourcesObject: Resources,
    costsObject: UnitCosts,
    unitType: UnitType,
    resourceType: ResourceType,
    updateType: "plus" | "minus" | "zero" | "max"
  ) => {
    switch (updateType) {
      // consume the amount of a resource type required to train that unit type
      case "plus":
        resourcesObject[resourceType].collected -=
          costsObject[unitType][resourceType];
        break;
      // return the amount of a resource type required to stop training that unit type
      case "minus":
        resourcesObject[resourceType].collected +=
          costsObject[unitType][resourceType];
        break;
      // return all resources of a given type required by the number of units you are stopping training
      case "zero":
        resourcesObject[resourceType].collected +=
          unitCosts[unitType][resourceType] * unitsInTraining[unitType];
        break;
    }
  };

  const handleZeroClick = (unitType: UnitType, friendly: boolean) => {
    if (unitsInTraining[unitType] > 0) {
      const updatedResources = { ...resources };

      // call the updateResources function for each resource
      Object.keys(updatedResources).map((resourceType) => {
        updateResources(
          updatedResources,
          unitCosts,
          unitType,
          resourceType as ResourceType,
          "zero"
        );
      });

      /* // Old approach to updating resources
      updatedResources["freeworkers"].collected +=
        freeworkerCost * unitsInTraining[unitType];
      updatedResources["wood"].collected +=
        woodCost * unitsInTraining[unitType];
      updatedResources["stone"].collected +=
        stoneCost * unitsInTraining[unitType];
      updatedResources["metal"].collected +=
        metalCost * unitsInTraining[unitType]; */
      setResources(updatedResources);

      // updates the myTrainingUnits array as well
      removeAllTrainingUnits(unitType, friendly);
    }
  };

  const handleMinusClick = (unitType: UnitType, friendly: boolean) => {
    if (unitsInTraining[unitType] > 0) {
      const updatedResources = { ...resources };

      // call the updateResources function for each resource
      Object.keys(updatedResources).map((resourceType) => {
        updateResources(
          updatedResources,
          unitCosts,
          unitType,
          resourceType as ResourceType,
          "minus"
        );
      });

      /* // Old approach to updating resources
      updatedResources["freeworkers"].collected += freeworkerCost;
      updatedResources["wood"].collected += woodCost;
      updatedResources["stone"].collected += stoneCost;
      updatedResources["metal"].collected += metalCost; */
      setResources(updatedResources);

      // updates the myTrainingUnits array as well
      removeTrainingUnit(unitType, friendly);
    }
  };

  const handlePlusClick = (unitType: UnitType, friendly: boolean) => {
    // TODO: Refactor so no repeats; dynamic
    if (
      resources["freeworkers"].collected >= freeworkerCost &&
      resources["wood"].collected >= woodCost &&
      resources["stone"].collected >= stoneCost &&
      resources["metal"].collected >= metalCost
    ) {
      // reduce the resources according to costs
      const updatedResources = { ...resources };

      // call the updateResources function for each resource
      Object.keys(updatedResources).map((resourceType) => {
        updateResources(
          updatedResources,
          unitCosts,
          unitType,
          resourceType as ResourceType,
          "plus"
        );
      });

      /* Old approach to updating resources
      updatedResources["freeworkers"].collected -= freeworkerCost;
      updatedResources["wood"].collected -= woodCost;
      updatedResources["stone"].collected -= stoneCost;
      updatedResources["metal"].collected -= metalCost; */
      setResources(updatedResources);

      // updates the myTrainingUnits array as well
      addTrainingUnit(unitType, friendly);
    } else {
      alert("Not enough resources!");
    }
  };

  // check all costs and see that at least one unit can be afforded
  const maxTrainable = Math.min(
    Math.floor(resources["freeworkers"].collected / freeworkerCost),
    Math.floor(resources["wood"].collected / woodCost),
    Math.floor(resources["stone"].collected / stoneCost),
    Math.floor(resources["metal"].collected / metalCost)
  );
  const handleMaxClick = (unitType: UnitType, friendly: boolean) => {
    // FIXME: Doesn't work if one a resource COST is zero, even if that resource isn't required
    // TODO: Incorporate logic to check what resources are required for the unitType

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

  const redText = "text-red-600";
  const greenText = "text-green-500";

  return (
    <CardTemplate color="red">
      <TrainUnitCardHeader
        cardName={BASE_UNIT_DATA[unitType].name}
        attack={BASE_UNIT_DATA[unitType].attack}
        health={BASE_UNIT_DATA[unitType].maxHealth}
      ></TrainUnitCardHeader>
      <CardSymbol cardSymbol={BASE_UNIT_DATA[unitType].nameSymbol} />
      <CardDescription descriptionText={BASE_UNIT_DATA[unitType].description} />

      <div className="grid auto-rows-auto grid-cols-2">
        <div className="col-span-1 col-start-1 pl-2 font-bold">Cost</div>
        <div className="col-span-1 col-start-2 grid auto-rows-auto pr-2 text-lg">
          {/* TODO: Refactor to improve nested ternary */}
          {Object.keys(resources).map(
            (resourceType) =>
              /* If this resource is required, show its cost */
              unitCosts[unitType][resourceType as ResourceType] > 0 &&
              // if you don't have enough collected to train the unit, show in red; else green
              (resources[resourceType as ResourceType].collected <
              unitCosts[unitType][resourceType as ResourceType] ? (
                <div>
                  {resources[resourceType as ResourceType].resourceSymbol}
                  <span className={`${redText} px-1`}>
                    {resources[resourceType as ResourceType].collected}
                  </span>
                  /
                  <span className={`px-1`}>
                    {unitCosts[unitType][resourceType as ResourceType]}
                  </span>
                </div>
              ) : (
                <div>
                  {resources[resourceType as ResourceType].resourceSymbol}
                  <span className={`${greenText} px-1`}>
                    {resources[resourceType as ResourceType].collected}
                  </span>
                  /
                  <span className={`px-1`}>
                    {unitCosts[unitType][resourceType as ResourceType]}
                  </span>
                </div>
              ))
          )}
        </div>
      </div>
      {/* Could use this to display max trainable
      <div className="justify-self-end">
        Can afford: {maxTrainable > 0 ? maxTrainable : "0"}
      </div>
      */}

      {/* TODO: Match the style of the worker card! */}

      <div className="grid auto-cols-min grid-cols-5 gap-1">
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
        {/* string may not match "melee", "pewpew" etc. Use as "keyof" to say it'll be appropriate */}
        {/* ! assures TS that this will not be undefined; not ideal general solution */}
        <CardShowCount
          countToShow={unitsInTraining[unitType as keyof UnitCounts]!}
        />
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
