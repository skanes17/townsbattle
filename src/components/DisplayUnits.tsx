import React from "react";
import { UnitCounts } from "../types/UnitCounts";

interface DisplayUnitsProps {
  unitCounts: UnitCounts;
}

export default function DisplayUnits({ unitCounts }: DisplayUnitsProps) {
  const armySize =
    unitCounts.meleeCount + unitCounts.pewpewCount + unitCounts.tankyCount;

  return (
    <>
      <div style={{ fontWeight: "bold" }}>Units trained: {armySize}</div>
      {/* TODO: <UnitCount /> three times? -- DRY! */}
      <div>🗡️ {unitCounts.meleeCount} Melee</div>
      <div>🏹 {unitCounts.pewpewCount} Pewpew</div>
      <div>🛡️ {unitCounts.tankyCount} Tanky</div>
    </>
  );
}
