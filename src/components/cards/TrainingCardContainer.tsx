import React, { Dispatch, SetStateAction } from "react";
import {
  BaseUnitData,
  Buildings,
  ResourcePool,
  Resources,
  UnitCounts,
} from "../../types";
import TrainUnitCard from "./TrainUnitCard";

import { UnitType } from "../../types";
import { AddRemoveUnitFn, MaxTrainingUnitsFn } from "../../types/FunctionTypes";

export interface TrainingCardContainerProps {
  unlockedUnitTypes: (UnitType | undefined)[];
  lockedUnitTypes: (UnitType | undefined)[];
  buildings: Buildings;
  resources: Resources;
  resourcePool: ResourcePool;
  setResourcePool: Dispatch<SetStateAction<ResourcePool>>;
  unitsInTraining: UnitCounts;
  BASE_UNIT_DATA: BaseUnitData;
  addTrainingUnit: AddRemoveUnitFn;
  maxTrainingUnits: MaxTrainingUnitsFn;
  removeTrainingUnit: AddRemoveUnitFn;
  removeAllTrainingUnits: AddRemoveUnitFn;
}

export default function TrainingCardContainer({
  unlockedUnitTypes,
  lockedUnitTypes,
  buildings,
  resources,
  resourcePool,
  setResourcePool,
  unitsInTraining,
  BASE_UNIT_DATA,
  addTrainingUnit,
  maxTrainingUnits,
  removeTrainingUnit,
  removeAllTrainingUnits,
}: TrainingCardContainerProps) {
  return (
    <>
      {unlockedUnitTypes.map((unitType) => (
        <TrainUnitCard
          key={unitType}
          lockedOrUnlockedUnits="unlocked"
          unitType={unitType as UnitType}
          resources={resources}
          resourcePool={resourcePool}
          setResourcePool={setResourcePool}
          unitsInTraining={unitsInTraining}
          BASE_UNIT_DATA={BASE_UNIT_DATA}
          addTrainingUnit={addTrainingUnit}
          maxTrainingUnits={maxTrainingUnits}
          removeTrainingUnit={removeTrainingUnit}
          removeAllTrainingUnits={removeAllTrainingUnits}
          friendly={true}
        />
      ))}

      {lockedUnitTypes.map((unitType) =>
        buildings["crystalQuarry"].constructed ? (
          /* If the crystal quarry unlocked? Show all the units */
          <TrainUnitCard
            key={unitType}
            lockedOrUnlockedUnits="locked"
            unitType={unitType as UnitType}
            resources={resources}
            resourcePool={resourcePool}
            setResourcePool={setResourcePool}
            unitsInTraining={unitsInTraining}
            BASE_UNIT_DATA={BASE_UNIT_DATA}
            addTrainingUnit={addTrainingUnit}
            maxTrainingUnits={maxTrainingUnits}
            removeTrainingUnit={removeTrainingUnit}
            removeAllTrainingUnits={removeAllTrainingUnits}
            friendly={true}
          />
        ) : (
          /* Crystal quarry NOT unlocked? Hide units requiring crystal */
          !BASE_UNIT_DATA[unitType as UnitType].resourceCosts.crystal && (
            <TrainUnitCard
              key={unitType}
              lockedOrUnlockedUnits="locked"
              unitType={unitType as UnitType}
              resources={resources}
              resourcePool={resourcePool}
              setResourcePool={setResourcePool}
              unitsInTraining={unitsInTraining}
              BASE_UNIT_DATA={BASE_UNIT_DATA}
              addTrainingUnit={addTrainingUnit}
              maxTrainingUnits={maxTrainingUnits}
              removeTrainingUnit={removeTrainingUnit}
              removeAllTrainingUnits={removeAllTrainingUnits}
              friendly={true}
            />
          )
        )
      )}
    </>
  );
}
