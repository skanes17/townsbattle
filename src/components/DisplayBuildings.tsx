// @ts-nocheck

import React from "react";

// TODO: Check if building is enabled in the state, show UI accordingly
export default function DisplayBuildings({ buildings }) {
  //TODO: Figure out how to filter by enabled; maybe make buildings into an array

  /* const filteredBuildings = Object.keys(buildings).filter(
    (key) => buildings[key].enabled
  ); */

  const filteredBuildings = buildings.filter((building) => building.enabled);



  return (
    <>
      {/* This would show conditionally based on buildings state */}
      <div style={{ fontWeight: "bold" }}>Buildings constructed</div>
      <p>This will reflect buildings constructed.</p>
      filteredBuildings.map((building) => (
          
          <p>{building.name}</p>
{/*       <p>Tier: {building.tier}</p>
 */}    ))
    </>
  );
}
