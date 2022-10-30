import React, { useState } from "react";
import Combat from "./Combat";
// @ts-ignore
import Building from "./Building";

// @ts-ignore
export default function Game(props) {
  const [turn, setTurn] = useState(1);
  // number of new workers per turn can increase over time
  const [woodworkers, setWoodworkers] = useState(0);
  const [stoneworkers, setStoneworkers] = useState(0);
  const [ironworkers, setIronworkers] = useState(0);
  const [newWorkers, setNewWorkers] = useState(1);
  const [freeworkers, setFreeworkers] = useState(5);
  // combat turn will change over time
  const [combatTurn, setCombatTurn] = useState(4);

  function endTurn() {
    setTurn(turn + 1);
    setFreeworkers(freeworkers + newWorkers);
  }

  return (
    <div>
      <h1>Welcome to the game.</h1>
      <div style={{ fontWeight: "bold" }}>Turn Number: {turn}</div>
      <br></br>
      {/* TODO: Hide this during combat */}
      <div className="freeworkers" style={{ fontWeight: "bold" }}>
        Free Workers: {freeworkers}
      </div>
      <br></br>
      <div className="buildings">
        <Building
          type="Woodworkers"
          workers={woodworkers}
          setWorkers={setWoodworkers}
          freeworkers={freeworkers}
          setFreeworkers={setFreeworkers}
        />
        <Building
          type="Stoneworkers"
          workers={stoneworkers}
          setWorkers={setStoneworkers}
          freeworkers={freeworkers}
          setFreeworkers={setFreeworkers}
        />
        <Building
          type="Ironworkers"
          workers={ironworkers}
          setWorkers={setIronworkers}
          freeworkers={freeworkers}
          setFreeworkers={setFreeworkers}
        />
      </div>
      <br></br>
      {/* TODO: Have resources gathered from buildings at end of turn */}
      <button onClick={endTurn}>End Turn</button>

      <div>
        {turn === combatTurn ? (
          <Combat />
        ) : (
          <div>Combat is in {combatTurn - turn} turns.</div>
        )}
      </div>
    </div>
  );
}
