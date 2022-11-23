import { BaseUnit } from "../types/BaseUnit";
import { Resources } from "../types/Resources";
import { Unit } from "../types/Unit";
import { UnitCosts } from "../types/UnitCosts";
import { UnitsInTraining } from "../types/UnitInTraining";
import TrainUnits from "./TrainUnits";

interface UnitCreationProps {
  unitCosts: UnitCosts;
  setUnitCosts: any;
  unitsInTraining: UnitsInTraining;
  resources: Resources;
  setResources: any;
  BASE_UNIT_DATA: BaseUnit;
  addTrainingUnit: any;
  removeTrainingUnit: any;
}

export default function UnitCreation({
  unitCosts,
  unitsInTraining,
  resources,
  setResources,
  BASE_UNIT_DATA,
  addTrainingUnit,
  removeTrainingUnit,
}: UnitCreationProps) {
  return (
    <div>
      <h2 className="text-4xl font-extrabold dark:text-white">Unit Creation</h2>
      {/* TODO: Add defense against bugs (e.g. non-existant units) */}

      {Object.keys(BASE_UNIT_DATA).map((unitType: string) => (
        <TrainUnits
          unitType={unitType}
          resources={resources}
          setResources={setResources}
          unitCosts={unitCosts}
          unitsInTraining={unitsInTraining}
          BASE_UNIT_DATA={BASE_UNIT_DATA}
          addTrainingUnit={addTrainingUnit}
          removeTrainingUnit={removeTrainingUnit}
          friendly={true}
        />
      ))}
      <br></br>
    </div>
  );
}
