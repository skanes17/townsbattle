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
      <div>Melee: {meleeCounter}</div>
      <div>Pewpew: {pewpewCounter}</div>
      <div>Tanky: {tankyCounter}</div>
    </>
  );
}
