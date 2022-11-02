import React from "react";

// @ts-ignore
export default function Combat(props) {
  function endTurn() {
    // combat is every 4 turns -- change this later
    props.setCombatTurn(props.turn + 4);
    props.setTurn(props.turn + 1);
  }

  return (
    <>
      <h2>You are in combat. It's super fun and you love it.</h2>
      <div>[insert super fun combat here]</div>
      <br></br>
      <button onClick={endTurn}>End Turn</button>
    </>
  );
}
