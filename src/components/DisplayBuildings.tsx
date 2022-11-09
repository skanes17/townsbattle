// @ts-nocheck

import React from "react";

// TODO: Check if building is enabled in the state, show UI accordingly
export default function DisplayBuildings({ buildings }) {
  //TODO: Figure out how to filter by enabled; maybe make buildings into an array
  /*   const enabledBuildings = buildings.filter(
    (building) => building.enabled == false
  ); */

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
