import React from "react";

// @ts-ignore
export default function DisplayResources(props) {
  return (
    <>
      <div style={{ fontWeight: "bold" }}>Resources collected</div>
      {/* TODO: <Resource /> three times -- DRY! */}
      {/* NOTE: If using the resource object is wonlky, go back to old code for now */}
      <div>🪵Wood {props.resources.woodCollected}</div>
      <div>🪨Stone {props.resources.stoneCollected}</div>
      <div>🔩Metal {props.resources.metalCollected}</div>
    </>
  );
}
