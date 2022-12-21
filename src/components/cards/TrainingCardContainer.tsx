import React from "react";
import { BaseUnit } from "../../types/BaseUnit";
import { Resources } from "../../types/Resources";
import { UnitCosts } from "../../types/UnitCosts";
import { UnitCounts } from "../../types/UnitCounts";
import TrainUnitCard from "./TrainUnitCard";

export interface TrainingCardContainerProps {
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
}

export default function TrainingCardContainer({
  resources,
  setResources,
  unitCosts,
  unitsInTraining,
  BASE_UNIT_DATA,
  addTrainingUnit,
  maxTrainingUnits,
  removeTrainingUnit,
  removeAllTrainingUnits,
}: TrainingCardContainerProps) {
  return (
    <>
      {Object.keys(BASE_UNIT_DATA).map((unitType: string) => (
        <TrainUnitCard
          unitType={unitType}
          resources={resources}
          setResources={setResources}
          unitCosts={unitCosts}
          unitsInTraining={unitsInTraining}
          BASE_UNIT_DATA={BASE_UNIT_DATA}
          addTrainingUnit={addTrainingUnit}
          maxTrainingUnits={maxTrainingUnits}
          removeTrainingUnit={removeTrainingUnit}
          removeAllTrainingUnits={removeAllTrainingUnits}
          friendly={true}
        />
      ))}
    </>
  );
}
