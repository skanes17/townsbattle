import { Resources } from "../types/Resources";
import { UnitCosts } from "../types/UnitCosts";
import { UnitsInTraining } from "../types/UnitInTraining";
import TrainUnits from "./TrainUnits";

interface UnitCreationProps {
  unitCosts: UnitCosts;
  setUnitCosts: any;
  unitsInTraining: UnitsInTraining;
  setUnitsInTraining: any;
  resources: Resources;
  setResources: any;
}

export default function UnitCreation({
  unitCosts,
  setUnitCosts,
  unitsInTraining,
  setUnitsInTraining,
  resources,
  setResources,
}: UnitCreationProps) {
  const unitTypes = Object.keys(unitsInTraining);

  return (
    <div>
      <h2 className="text-4xl font-extrabold dark:text-white">Unit Creation</h2>
      {/* TODO: Add defense against bugs (e.g. non-existant units) */}

      {unitTypes.map((unitType: string) => (
        <TrainUnits
          name="🗡️ Melee"
          unitType={unitType}
          resources={resources}
          setResources={setResources}
          unitCosts={unitCosts}
          unitsInTraining={unitsInTraining}
          setUnitsInTraining={setUnitsInTraining}
        />
      ))}
    </div>
  );
}
