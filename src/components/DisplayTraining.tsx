import React from "react";
import { UnitsInTraining } from "../types/UnitInTraining";

interface DisplayTrainingProps {
  unitsInTraining: UnitsInTraining;
}

export default function DisplayTraining({
  unitsInTraining,
}: DisplayTrainingProps) {
  return (
    <div>
      <div className="font-bold">Units In Training</div>
      <div className="grid grid-flow-col gap-4 auto-cols-max">
        {/* TODO: <UnitCount /> three times? -- DRY! */}
        <div>🗡️ {unitsInTraining.melee}</div>
        <div>🏹 {unitsInTraining.pewpew}</div>
        <div>🛡️ {unitsInTraining.tanky}</div>
      </div>
    </div>
  );
}
