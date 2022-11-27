// @ts-nocheck

import React from "react";

interface DisplayBuildingsProps {
  buildings: Buildings;
}

export default function DisplayBuildings({ buildings }: DisplayBuildingsProps) {
  // Filter returns the buildings data for constructed buildings
  // Object.keys(buildings) then returns only the keys (names) for those enabled buildings
  const constructedBuildings = Object.keys(buildings).filter(
    (key) => buildings[key].constructed
  );

  return (
    <div>
      <div style={{ fontWeight: "bold" }}>Buildings constructed</div>
      {/* buildings are mapped dynamically to component */}
      {constructedBuildings.map((buildingType) => (
        <div className="pl-4 border-2 border-orange-400 rounded-md flex-col">
          <div>{buildings[buildingType].name}</div>
          <div>
            <img src="../images/town-center.png" alt="Image of town center" />
          </div>
          {buildings[buildingType].effect === "" ? (
            <div>
              <span className="font-bold">Effect </span>
              <span>None</span>
            </div>
          ) : (
            <div>
              <span className="font-bold">Effect </span>
              <span>{buildings[buildingType].effect}</span>
            </div>
          )}
          <div className="flex flew-row-reverse">
            <div>Tier: {buildings[buildingType].tier}</div>
            {/* TODO: Replace number for health with heart symbols */}
            <div>❤️ Health: {buildings[buildingType].health}</div>
          </div>
        </div>
      ))}
    </div>
  );
}
