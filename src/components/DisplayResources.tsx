import React from "react";

// @ts-ignore
export default function DisplayResources(props) {
  return (
    <>
      <div style={{ fontWeight: "bold" }}>Resources collected</div>
      {/* TODO: <Resource /> three times -- DRY! */}
      <div>🪵Wood {props.wood}</div>
      <div>🪨Stone {props.stone}</div>
      <div>🔩Metal {props.metal}</div>
    </>
  );
}
