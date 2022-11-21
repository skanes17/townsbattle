// @ts-nocheck

import React from "react";

interface DisplayBuildingsProps {
  buildings: Buildings;
}

export default function DisplayBuildings({ buildings }: DisplayBuildingsProps) {
  // Filter returns the buildings data for enabled buildings
  // Object.keys(buildings) then returns only the keys (names) for those enabled buildings
  const enabledBuildings = Object.keys(buildings).filter(
    (key) => buildings[key].enabled
  );

  return (
    <>
      <div style={{ fontWeight: "bold" }}>Buildings constructed</div>
      {/* buildings are mapped dynamically to component */}
      {enabledBuildings.map((buildingType) => (
        <>
          <p>{buildings[buildingType].name}</p>
          <p>Tier: {buildings[buildingType].tier}</p>
          {/* TODO: Replace number for health with heart symbols */}
          <p>❤️ Health: {buildings[buildingType].health}</p>
          {buildings[buildingType].effect === "" ? (
            <p>No effect</p>
          ) : (
            <p>Effect: {buildings[buildingType].effect}</p>
          )}
        </>
      ))}
    </>
  );
}
