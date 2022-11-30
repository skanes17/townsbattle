import React from "react";
import { UnitsInTraining } from "../types/UnitInTraining";

interface DisplayTrainingProps {
  unitsInTraining: UnitsInTraining;
}

export default function DisplayTraining({
  unitsInTraining,
}: DisplayTrainingProps) {
  return (
    <div className="m-auto text-center">
      <div className="font-bold sm:text-sm md:text-base lg:text-lg">
        Units in Training
      </div>
      <div className="grid auto-cols-max grid-flow-col gap-4 transition ease-in-out hover:scale-105 hover:text-yellow-300 md:text-lg lg:text-2xl">
        {/* TODO: <UnitCount /> three times? -- DRY! */}
        <div>🗡️ {unitsInTraining.melee}</div>
        <div>🏹 {unitsInTraining.pewpew}</div>
        <div>🛡️ {unitsInTraining.tanky}</div>
      </div>
    </div>
  );
}
