import React, { useState } from "react";
import {
  BaseUnit,
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
  // function checks how many of each resource type is collected vs. the resources required for that unit, add/reduces them as necessary
  const updateResources = (
    resourcesObject: Resources,
    /* costsObject: UnitCosts, */
    unitType: UnitType,
    resourceType: ResourceType,
    updateType: "plus" | "minus" | "zero" | "max"
  ) => {
    switch (updateType) {
      // consume the amount of a resource type required to train that unit type
      case "plus":
        resourcesObject[resourceType].collected -=
          BASE_UNIT_DATA[unitType].resourceCosts[resourceType] ?? 0;
        break;
      // return the amount of a resource type required to stop training that unit type
      case "minus":
        resourcesObject[resourceType].collected +=
          BASE_UNIT_DATA[unitType].resourceCosts[resourceType] ?? 0;
        break;
      // return all resources of a given type required by the number of units you are stopping training
      case "zero":
        resourcesObject[resourceType].collected +=
          (BASE_UNIT_DATA[unitType].resourceCosts[resourceType] ?? 0) *
          unitsInTraining[unitType];
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
          unitType,
          resourceType as ResourceType,
          "zero"
        );
      });

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
          unitType,
          resourceType as ResourceType,
          "minus"
        );
      });

      setResources(updatedResources);

      // updates the myTrainingUnits array as well
      removeTrainingUnit(unitType, friendly);
    }
  };

  const handlePlusClick = (unitType: UnitType, friendly: boolean) => {
    // check how many resources are collected compared to how many are required
    // || used to catch instances of undefined, setting falsy return to 0
    // eg. iteration of resourceType is "metal" but the object doesn't have metal
    const checkIfEnoughResources = Object.keys(resources).map(
      (resourceType: string) =>
        resources[resourceType as ResourceType].collected >=
          BASE_UNIT_DATA[unitType].resourceCosts[unitType] || 0
    );
    // arr.every() will ceheck that every result of the above map is true; ie enoughResources === true
    if (checkIfEnoughResources.every(Boolean)) {
      // reduce the resources according to costs
      const updatedResources = { ...resources };

      // call the updateResources function for each resource
      Object.keys(updatedResources).map((resourceType) => {
        updateResources(
          updatedResources,
          unitType,
          resourceType as ResourceType,
          "plus"
        );
      });

      setResources(updatedResources);

      // updates the myTrainingUnits array as well
      addTrainingUnit(unitType, friendly);
    } else {
      alert("Not enough resources!");
    }
  };

  // produce an array to compare resources collected vs. resource cost
  // this produce an array that holds how many of each unit can be built
  const minTrainableForEachCost = Object.keys(
    BASE_UNIT_DATA[unitType].resourceCosts
  ).map(
    (resourceType: string) =>
      (resources[resourceType as ResourceType].collected ??
        0 /
          BASE_UNIT_DATA[unitType].resourceCosts[
            resourceType as ResourceType
          ]) ||
      0
  );

  // spread operator is required to use Math.min() on number arrays
  const maxTrainable = Math.min(...minTrainableForEachCost);
  // NOTE: Above, ?? is a catch for if resources collected is undefined and || is a catch for a result of NaN

  const handleMaxClick = (unitType: UnitType, friendly: boolean) => {
    if (maxTrainable > 0) {
      const updatedResources = { ...resources };

      Object.keys(resources).map(
        (resourceType: string) =>
          (updatedResources[resourceType as ResourceType].collected -=
            BASE_UNIT_DATA[unitType].resourceCosts[
              resourceType as ResourceType
            ] * maxTrainable)
      );
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

      <CardCostsInfo
        resources={resources}
        costsObject={BASE_UNIT_DATA[unitType].resourceCosts}
      />

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
