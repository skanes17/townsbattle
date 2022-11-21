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
  // TODO:
  // 1-Use map to send enabledBuildings items to a component
  // 2-Edit the process as below to map building properties to UI

  const filteredBuildings = buildings.filter((building) => building.enabled);

  // TODO: Incorporate keys here
  return (
    <>
      <div style={{ fontWeight: "bold" }}>Buildings constructed</div>
      {filteredBuildings.map((building) => (
        <>
          <p>{building.name}</p>
          <p>Tier: {building.tier}</p>
          {/* TODO: Replace number for health with heart symbols */}
          <p>❤️ Health: {building.health}</p>
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
