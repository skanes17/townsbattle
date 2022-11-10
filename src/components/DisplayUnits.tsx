// @ts-nocheck

import React from "react";

// @ts-ignore
export default function DisplayUnits({
  meleeCounter,
  pewpewCounter,
  tankyCounter,
}) {
  return (
    <>
      <div style={{ fontWeight: "bold" }}>Units trained</div>
      <div>🗡️ {meleeCounter} Melee</div>
      <div>🏹 {pewpewCounter} Pewpew</div>
      <div>🛡️ {tankyCounter} Tanky</div>
    </>
  );
}
