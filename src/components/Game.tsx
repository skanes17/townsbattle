import React, { useState } from "react";
import Planning from "./Planning";
import Combat from "./Combat";

// @ts-ignore
export default function Game(props) {
  const [turn, setTurn] = useState(1);
  // combat turn will change over time
  const [combatTurn, setCombatTurn] = useState(4);

  return (
    <div>
      <h1>Welcome to the game.</h1>
      <div style={{ fontWeight: "bold" }}>Turn Number: {turn}</div>

      {turn === combatTurn ? (
        <Combat turn={turn} setTurn={setTurn} setCombatTurn={setCombatTurn} />
      ) : (
        <Planning turn={turn} setTurn={setTurn} />
      )}
    </div>
  );
}
