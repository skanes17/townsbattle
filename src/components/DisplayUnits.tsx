import React from "react";

interface DisplayUnitsProps {
  meleeCount: number;
  pewpewCount: number;
  tankyCount: number;
}

export default function DisplayUnits({
  meleeCount,
  pewpewCount,
  tankyCount,
}: DisplayUnitsProps) {
  return (
    <>
      <div style={{ fontWeight: "bold" }}>Units trained</div>
      {/* TODO: <UnitCount /> three times? -- DRY! */}
      <div>🗡️ {meleeCount} Melee</div>
      <div>🏹 {pewpewCount} Pewpew</div>
      <div>🛡️ {tankyCount} Tanky</div>
    </>
  );
}
