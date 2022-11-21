import React from "react";
import { UnitCounts } from "../types/UnitCounts";

interface DisplayUnitsProps {
  unitCounts: UnitCounts;
}

export default function DisplayUnits({ unitCounts }: DisplayUnitsProps) {
  const armySize = unitCounts.melee + unitCounts.pewpew + unitCounts.tanky;

  return (
    <>
      <div style={{ fontWeight: "bold" }}>Units trained: {armySize}</div>
      {/* TODO: <UnitCount /> three times? -- DRY! */}
      <div>🗡️ {unitCounts.melee} Melee</div>
      <div>🏹 {unitCounts.pewpew} Pewpew</div>
      <div>🛡️ {unitCounts.tanky} Tanky</div>
    </>
  );
}
