import React, { useState } from "react";
import {
  BaseUnit,
  ResourceCosts,
  Resources,
  ResourceType,
  UnitCounts,
  UnitType,
} from "../../types/";
import {
  CardShowCount,
  CardSymbol,
  CardTemplate,
  TrainUnitCardHeader,
  CardDescription,
  CardCostsInfo,
} from "../cards";
import { AddRemoveButton } from "../buttons";
import { AddRemoveUnitFn, MaxTrainingUnitsFn } from "../../types";
import { cloneBasicObjectWithJSON } from "../../utils";

export interface TrainUnitCardProps {
  // TODO: Could use Unit["unitType"];
  unitType: UnitType;
  resources: Resources;
  setResources: (resources: Resources) => void;
  unitsInTraining: UnitCounts;
  BASE_UNIT_DATA: BaseUnit;
  addTrainingUnit: AddRemoveUnitFn;
  maxTrainingUnits: MaxTrainingUnitsFn;
  removeTrainingUnit: AddRemoveUnitFn;
  removeAllTrainingUnits: AddRemoveUnitFn;
  friendly: boolean;
}

export default function TrainUnitCard({
  unitType,
  resources,
  setResources,
  unitsInTraining,
  BASE_UNIT_DATA,
  addTrainingUnit,
  maxTrainingUnits,
  removeTrainingUnit,
  removeAllTrainingUnits,
  friendly,
}: TrainUnitCardProps) {
  // get the resource costs for the given unit type
  const unitCosts = BASE_UNIT_DATA[unitType].resourceCosts;

  // function checks how many of each resource type is collected vs. the resources required for that unit, add/reduces them as necessary
  const updateResources = (
    resourcesObject: Resources,
    resourceType: ResourceType,
    updateType: "plus" | "minus" | "zero" | "max"
  ) => {
    switch (updateType) {
      // consume the amount of a resource type required to train that unit type
      case "plus":
        resourcesObject[resourceType].collected -= unitCosts[resourceType] ?? 0;
        break;
      // return the amount of a resource type required to stop training that unit type
      case "minus":
        resourcesObject[resourceType].collected += unitCosts[resourceType] ?? 0;
        break;
      // return all resources of a given type required by the number of units you are stopping training
      case "zero":
        resourcesObject[resourceType].collected +=
          (unitCosts[resourceType] ?? 0) * unitsInTraining[unitType];
        break;
    }
  };

  const handleZeroClick = (unitType: UnitType, friendly: boolean) => {
    if (unitsInTraining[unitType] === 0) {
      alert("You aren't training any units!");
      return;
    }
    const clonedResourceData = cloneBasicObjectWithJSON(resources);

    // instead of using Object.keys() we're using Object.entries()
    // this is used because the key and value were both required
    // resourceType holds the current key for unitCosts -- "freeworkers", "wood", etc
    // cost gives the values for the resourceType -- previously called by unitCosts[resourceType]

    for (const [resourceType, cost] of Object.entries(unitCosts)) {
      clonedResourceData[resourceType as ResourceType].collected +=
        (cost ?? 0) * unitsInTraining[unitType];
    }

    setResources(clonedResourceData);
    // updates the myTrainingUnits array as well
    removeAllTrainingUnits(unitType, friendly);
  };

  const handleMinusClick = (unitType: UnitType, friendly: boolean) => {
    /* TODO: Find more efficient approach than to consider units in training? */
    if (unitsInTraining[unitType] === 0) {
      alert("You aren't training any units!");
      return;
    }

    const clonedResourceData = cloneBasicObjectWithJSON(resources);

    for (const [resourceType, cost] of Object.entries(unitCosts)) {
      clonedResourceData[resourceType as ResourceType].collected += cost ?? 0;
    }

    setResources(clonedResourceData);
    // updates the myTrainingUnits array as well
    removeTrainingUnit(unitType, friendly);
  };

  const handlePlusClick = (unitType: UnitType, friendly: boolean) => {
    // check how many resources are collected compared to how many are required
    // || used to catch instances of undefined by returning 0
    // eg. iteration of resourceType is "metal" but the object doesn't have metal
    const checkIfEnoughResources = Object.keys(unitCosts).map(
      (resourceType: string) =>
        resources[resourceType as ResourceType].collected >=
        unitCosts[resourceType as ResourceType]
    );

    // arr.every() will check that every result of the above map is true; ie enoughResources === true
    if (checkIfEnoughResources.every(Boolean)) {
      // reduce the resources according to costs
      const clonedResourceData = cloneBasicObjectWithJSON(resources);

      for (const [resourceType, cost] of Object.entries(unitCosts)) {
        clonedResourceData[resourceType as ResourceType].collected -= cost ?? 0;
      }

      setResources(clonedResourceData);
      // updates the myTrainingUnits array as well
      addTrainingUnit(unitType, friendly);
    } else {
      alert("Not enough resources!");
    }
  };

  // produce an array to compare resources collected vs. resource cost
  // this produce an array that holds how many of each unit can be built
  const minTrainableForEachCost = Object.keys(unitCosts).map(
    (resourceType: string) => {
      // get the resource cost to train this unit
      const cost = unitCosts[resourceType as ResourceType];
      // if the cost isn't zero, divide the collected resources by the cost
      // use the floor function to ensure an integer result
      // otherwise, return 0
      return cost !== 0
        ? Math.floor(resources[resourceType as ResourceType].collected / cost)
        : 0;
    }
  );

  // spread operator is required to use Math.min() on number arrays
  const maxTrainable = Math.min(...minTrainableForEachCost);

  const handleMaxClick = (unitType: UnitType, friendly: boolean) => {
    if (maxTrainable <= 0) {
      alert("Not enough resources!");
      return;
    }
    const clonedResourceData = cloneBasicObjectWithJSON(resources);

    for (const [resourceType, cost] of Object.entries(unitCosts)) {
      clonedResourceData[resourceType as ResourceType].collected -=
        cost * maxTrainable;
    }

    setResources(clonedResourceData);
    maxTrainingUnits(unitType, friendly, maxTrainable);
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

      <CardCostsInfo resources={resources} costsObject={unitCosts} />

      {/* Could use this to display max trainable
      <div className="justify-self-end">
        Can afford: {maxTrainable > 0 ? maxTrainable : "0"}
      </div>
      */}

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
