// @ts-nocheck

import React from "react";

// @ts-ignore
export default function DisplayUnits({
  meleeCount,
  pewpewCount,
  tankyCount,
}) {
  return (
    <>
      <div style={{ fontWeight: "bold" }}>Units trained</div>
      <div>🗡️ {meleeCount} Melee</div>
      <div>🏹 {pewpewCount} Pewpew</div>
      <div>🛡️ {tankyCount} Tanky</div>
    </>
  );
}
