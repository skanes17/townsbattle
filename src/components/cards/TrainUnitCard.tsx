import React, { Dispatch, SetStateAction, useState } from "react";
import {
  BaseUnit,
  ResourcePool,
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
  CardCostsInfo,
  NewCardHeader,
} from "../cards";
import { AddRemoveButton } from "../buttons";
import { AddRemoveUnitFn, MaxTrainingUnitsFn } from "../../types";
import {
  cloneBasicObjectWithJSON,
  updateResources as updatedResourcePool,
} from "../../utils";
import { resourceChecker } from "../../utils/resourceChecker";
import CardBgWithImage from "./CardBgWithImage";
import CardHoverText from "./CardHoverText";

export interface TrainUnitCardProps {
  // TODO: Could use Unit["unitType"];
  unitType: UnitType;
  resources: Resources;
  resourcePool: ResourcePool;
  setResourcePool: Dispatch<SetStateAction<ResourcePool>>;
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
  resourcePool,
  setResourcePool,
  unitsInTraining,
  BASE_UNIT_DATA,
  addTrainingUnit,
  maxTrainingUnits,
  removeTrainingUnit,
  removeAllTrainingUnits,
  friendly,
}: TrainUnitCardProps) {
  // get the resource costs for the given unit type
  const costsObject = BASE_UNIT_DATA[unitType].resourceCosts;
  const numberOfUnitsInTraining = unitsInTraining[unitType];

  const handleZeroClick = (unitType: UnitType, friendly: boolean) => {
    if (numberOfUnitsInTraining === 0) {
      alert("You aren't training any units!");
      return;
    }
    const clonedResourcePool = cloneBasicObjectWithJSON(resourcePool);
    updatedResourcePool(
      costsObject,
      clonedResourcePool,
      -numberOfUnitsInTraining
    );

    setResourcePool(clonedResourcePool);
    // updates the myTrainingUnits array as well
    removeAllTrainingUnits(unitType, friendly);
  };

  const handleMinusClick = (unitType: UnitType, friendly: boolean) => {
    /* TODO: Find more efficient approach than to consider units in training? */
    if (numberOfUnitsInTraining === 0) {
      alert("You aren't training any units!");
      return;
    }

    const clonedResourcePool = cloneBasicObjectWithJSON(resourcePool);
    updatedResourcePool(costsObject, clonedResourcePool, -1);

    setResourcePool(clonedResourcePool);
    // updates the myTrainingUnits array as well
    removeTrainingUnit(unitType, friendly);
  };

  const handlePlusClick = (unitType: UnitType, friendly: boolean) => {
    // check that you've collected all required resources
    const resourceCheck = resourceChecker(costsObject, resourcePool);

    if (resourceCheck) {
      // reduce the resources according to costs
      const clonedResourcePool = cloneBasicObjectWithJSON(resourcePool);
      updatedResourcePool(costsObject, clonedResourcePool, 1);

      setResourcePool(clonedResourcePool);
      // updates the myTrainingUnits array as well
      addTrainingUnit(unitType, friendly);
    } else {
      alert("Not enough resources!");
    }
  };

  // produce an array to compare resources collected vs. resource cost
  // this produce an array that holds how many of each unit can be built
  const minTrainableForEachCost = Object.keys(costsObject).map(
    (resourceType: string) => {
      // get the resource cost to train this unit
      const cost = costsObject[resourceType as ResourceType];
      // if the cost isn't zero, divide the collected resources by the cost
      // use the floor function to ensure an integer result
      // otherwise, return 0
      return cost !== 0
        ? Math.floor(resourcePool[resourceType as ResourceType] / cost)
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
    const clonedResourcePool = cloneBasicObjectWithJSON(resourcePool);

    updatedResourcePool(costsObject, clonedResourcePool, maxTrainable);

    setResourcePool(clonedResourcePool);
    maxTrainingUnits(unitType, friendly, maxTrainable);
  };
  const redText = "text-red-600";
  const greenText = "text-green-500";

  return (
    <CardTemplate color="red">
      <CardBgWithImage
        saturation={"oversaturated"}
        bgImage={BASE_UNIT_DATA[unitType].bgImage}
      >
        <TrainUnitCardHeader
          cardName={BASE_UNIT_DATA[unitType].name}
          attack={BASE_UNIT_DATA[unitType].attack}
          health={BASE_UNIT_DATA[unitType].maxHealth}
        ></TrainUnitCardHeader>
        <CardHoverText>{BASE_UNIT_DATA[unitType].description}</CardHoverText>
      </CardBgWithImage>

      <CardCostsInfo
        resources={resources}
        resourcePool={resourcePool}
        costsObject={costsObject}
      />

      {/* Could use this to display max trainable
      <div className="justify-self-end">
        Can afford: {maxTrainable > 0 ? maxTrainable : "0"}
      </div>
      */}

      <div className="grid auto-cols-min grid-cols-5 gap-1 px-1">
        <div className="flex items-center justify-center font-bold">
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
        {/* FIXME: Sizing on mobile */}
        <CardShowCount countToShow={numberOfUnitsInTraining} />
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
