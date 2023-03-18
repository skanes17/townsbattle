import { Dispatch, SetStateAction } from "react";
import {
  UnitCounts,
  Resources,
  BaseUnitData,
  AddRemoveUnitFn,
  MaxTrainingUnitsFn,
  UnitType,
  ResourcePool,
} from "../../types";
import { TrainUnitCard } from "../cards";

interface UnitCreationProps {
  unitsInTraining: UnitCounts;
  resources: Resources;
  resourcePool: ResourcePool;
  setResourcePool: Dispatch<SetStateAction<ResourcePool>>;
  BASE_UNIT_DATA: BaseUnitData;
  addTrainingUnit: AddRemoveUnitFn;
  maxTrainingUnits: MaxTrainingUnitsFn;
  removeTrainingUnit: AddRemoveUnitFn;
  removeAllTrainingUnits: AddRemoveUnitFn;
}

export default function UnitCreation({
  unitsInTraining,
  resources,
  resourcePool,
  setResourcePool,
  BASE_UNIT_DATA,
  addTrainingUnit,
  maxTrainingUnits,
  removeTrainingUnit,
  removeAllTrainingUnits,
}: UnitCreationProps) {
  return (
    <div>
      <h2 className="text-4xl font-extrabold dark:text-white">Unit Creation</h2>
      {/* TODO: Add defense against bugs (e.g. non-existant units) */}

      {Object.keys(BASE_UNIT_DATA).map((unitType: string) => (
        <TrainUnitCard
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
      <br></br>
    </div>
  );
}
