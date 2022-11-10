// @ts-nocheck

import React from "react";

export default function DisplayBuildings({ buildings }) {
  // Old code for objects w/o array
  /* const filteredBuildings = Object.keys(buildings).filter(
    (key) => buildings[key].enabled
  ); */

  const filteredBuildings = buildings.filter((building) => building.enabled);

  // TODO: Incorporate keys here
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
