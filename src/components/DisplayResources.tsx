import React from "react";

// @ts-ignore
export default function DisplayResources(props) {
  return (
    <>
      <div style={{ fontWeight: "bold" }}>Resources collected</div>
      <div>Wood: {props.wood}</div>
      <div>Stone: {props.stone}</div>
      <div>Iron: {props.iron}</div>
    </>
  );
}
