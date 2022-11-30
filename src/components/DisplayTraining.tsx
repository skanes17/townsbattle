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
      <div className="font-bold lg:text-lg md:text-base sm:text-sm">
        Units in Training
      </div>
      <div className="transition ease-in-out hover:scale-105 hover:text-yellow-300 grid lg:text-2xl md:text-lg grid-flow-col gap-4 auto-cols-max">
        {/* TODO: <UnitCount /> three times? -- DRY! */}
        <div>🗡️ {unitsInTraining.melee}</div>
        <div>🏹 {unitsInTraining.pewpew}</div>
        <div>🛡️ {unitsInTraining.tanky}</div>
      </div>
    </div>
  );
}
