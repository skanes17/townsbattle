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
  CardTemplate,
  TrainUnitCardHeader,
  CardCostsInfo,
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
  lockedOrUnlockedUnits: "locked" | "unlocked";
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
  lockedOrUnlockedUnits,
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
  const lockedOrUnlocked = lockedOrUnlockedUnits;

  // get the resource costs for the given unit type
  const costsObject = BASE_UNIT_DATA[unitType].resourceCosts;
  const numberOfUnitsInTraining = unitsInTraining[unitType];

  const handleZeroClick = (unitType: UnitType, friendly: boolean) => {
    if (numberOfUnitsInTraining === 0) return;

    const clonedResourcePool = cloneBasicObjectWithJSON(resourcePool);
    updatedResourcePool(
      -numberOfUnitsInTraining,
      costsObject,
      clonedResourcePool
    );

    setResourcePool(clonedResourcePool);
    // updates the friendlyTrainingUnits array as well
    removeAllTrainingUnits(unitType, friendly);
  };

  const handleMinusClick = (
    amount: 1 | 5,
    unitType: UnitType,
    friendly: boolean
  ) => {
    /* TODO: Find more efficient approach than to consider units in training? */
    if (numberOfUnitsInTraining === 0) return;

    const clonedResourcePool = cloneBasicObjectWithJSON(resourcePool);
    updatedResourcePool(-amount, costsObject, clonedResourcePool);

    setResourcePool(clonedResourcePool);
    // updates the friendlyTrainingUnits array as well
    removeTrainingUnit(unitType, friendly);
  };

  const handlePlusClick = (
    amount: 1,
    unitType: UnitType,
    friendly: boolean
  ) => {
    // check that you've collected all required resources
    const resourceCheck = resourceChecker(amount, costsObject, resourcePool);

    if (resourceCheck) {
      // reduce the resources according to costs
      const clonedResourcePool = cloneBasicObjectWithJSON(resourcePool);
      updatedResourcePool(amount, costsObject, clonedResourcePool);

      setResourcePool(clonedResourcePool);
      // updates the friendlyTrainingUnits array as well
      addTrainingUnit(unitType, friendly);
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
    if (maxTrainable <= 0) return;

    const clonedResourcePool = cloneBasicObjectWithJSON(resourcePool);

    updatedResourcePool(maxTrainable, costsObject, clonedResourcePool);

    setResourcePool(clonedResourcePool);
    maxTrainingUnits(unitType, friendly, maxTrainable);
  };
  const redText = "text-red-600";
  const greenText = "text-green-500";

  const blurLockedUnitInfo =
    lockedOrUnlockedUnits === "locked" ? `blur-[1px]` : ``;
  const preventPointerEventsWithLockedUnits =
    lockedOrUnlockedUnits === "locked" ? `pointer-events-none` : ``;

  return (
    <CardTemplate lockedOrUnlockedUnits={lockedOrUnlocked} color="green">
      <CardBgWithImage
        cardStyle="planning"
        lockedOrUnlockedUnits={lockedOrUnlocked}
        saturation={lockedOrUnlocked === "locked" ? "quarter" : "oversaturated"}
        bgImage={BASE_UNIT_DATA[unitType].bgImage}
      >
        <TrainUnitCardHeader
          cardName={BASE_UNIT_DATA[unitType].name}
          attack={BASE_UNIT_DATA[unitType].attack}
          health={BASE_UNIT_DATA[unitType].maxHealth}
        ></TrainUnitCardHeader>

        {lockedOrUnlocked === "unlocked" && (
          <CardHoverText lockedOrUnlockedUnits={lockedOrUnlockedUnits}>
            {BASE_UNIT_DATA[unitType].description}
          </CardHoverText>
        )}
      </CardBgWithImage>

      {/* different hoverText if the unit is locked */}
      {lockedOrUnlocked === "locked" && (
        <CardHoverText lockedOrUnlockedUnits={lockedOrUnlockedUnits}>
          {BASE_UNIT_DATA[unitType].lockedText}
        </CardHoverText>
      )}

      <CardCostsInfo
        lockedOrUnlockedUnits={lockedOrUnlockedUnits}
        resources={resources}
        resourcePool={resourcePool}
        costsObject={costsObject}
      />
      <div
        className={`${blurLockedUnitInfo} ${preventPointerEventsWithLockedUnits} grid auto-cols-min grid-cols-6 gap-1 px-1 sm:grid-cols-5`}
      >
        <div className="col-span-2 row-start-1 flex items-center justify-center sm:col-span-1 sm:col-start-2">
          <AddRemoveButton
            buttonType="remove"
            onClick={() => handleMinusClick(1, unitType, friendly)}
          >
            -
          </AddRemoveButton>
        </div>
        {/* FIXME: Sizing on mobile */}
        <CardShowCount countToShow={numberOfUnitsInTraining} />
        <div className="col-span-2 row-start-1 flex items-center justify-center sm:col-span-1 sm:col-start-4">
          <AddRemoveButton
            buttonType="add"
            onClick={() => handlePlusClick(1, unitType, friendly)}
          >
            +
          </AddRemoveButton>
        </div>
        <div className="col-span-3 row-start-2 flex items-center justify-center font-bold sm:col-span-1 sm:col-start-1 sm:row-start-1">
          <AddRemoveButton
            buttonType="remove"
            onClick={() => handleZeroClick(unitType, friendly)}
          >
            Zero
          </AddRemoveButton>
        </div>
        <div className="col-span-3 row-start-2 flex items-center justify-center sm:col-span-1 sm:col-start-5 sm:row-start-1">
          <AddRemoveButton
            buttonType="add"
            onClick={() => handleMaxClick(unitType, friendly)}
          >
            Max
          </AddRemoveButton>
        </div>
      </div>

      {/* Could use this to display max trainable
      <div className="justify-self-end">
        Can afford: {maxTrainable > 0 ? maxTrainable : "0"}
      </div>
      */}
    </CardTemplate>
  );
}
