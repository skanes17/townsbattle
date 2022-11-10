import React from "react";

// @ts-ignore
export default function DisplayResources(props) {
  return (
    <>
      <div style={{ fontWeight: "bold" }}>Resources collected</div>
      <div>🪵 {props.wood}</div>
      <div>🪨 {props.stone}</div>
      <div>🔩 {props.metal}</div>
    </>
  );
}
