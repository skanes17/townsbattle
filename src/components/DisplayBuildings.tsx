// @ts-nocheck

import React from "react";

// TODO: Check if building is enabled in the state, show UI accordingly
export default function DisplayBuildings({ buildings }) {
  return (
    <>
      {/* This would show conditionally based on buildings state */}
      <div style={{ fontWeight: "bold" }}>Buildings constructed</div>
      <p>This will reflect buildings constructed.</p>
      {/* // takes the keys, makes an array of them, uses each one */}
      {Object.keys(buildings).map((building) => (
        <>
          <p>{building}</p>
        </>
      ))}
    </>
  );
}
