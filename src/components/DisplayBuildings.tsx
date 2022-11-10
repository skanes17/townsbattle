// @ts-nocheck

import React from "react";

// TODO: Check if building is enabled in the state, show UI accordingly
export default function DisplayBuildings({ buildings }) {
  //TODO: Figure out how to filter by enabled; maybe make buildings into an array

  // Old code for objects w/o array
  /* const filteredBuildings = Object.keys(buildings).filter(
    (key) => buildings[key].enabled
  ); */

  const filteredBuildings = buildings.filter((building) => building.enabled);

  return (
    <>
      <div style={{ fontWeight: "bold" }}>Buildings constructed</div>
      {filteredBuildings.map((building) => (
        <>
          <p>{building.name}</p>
          <p>Tier: {building.tier}</p>
          <p>Health: {building.health}</p>
          {building.effect === "" ? (
            <p>No effect</p>
          ) : (
            <p>Effect: {building.effect}</p>
          )}
        </>
      ))}
    </>
  );
}
