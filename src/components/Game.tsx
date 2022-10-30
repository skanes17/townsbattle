import React, { useState } from "react";
import Combat from "./Combat";
// @ts-ignore
import Building from "./Building";

// @ts-ignore
export default function Game(props) {
  const [turn, setTurn] = useState(1);
  // number of new workers per turn can increase over time
  const [newWorkersPerTurn, setNewWorkersPerTurn] = useState(1);
  const [freeworkers, setFreeworkers] = useState(5);
  // combat turn will change over time
  const [combatTurn, setCombatTurn] = useState(4);

  function moreFreeworkers() {
    setFreeworkers(freeworkers + newWorkersPerTurn);
  }

  function lessFreeworkers() {
    setFreeworkers(freeworkers - newWorkersPerTurn);
  }

  function endTurn() {
    setTurn(turn + 1);
    if (turn === combatTurn) {
      alert("Combat!");
      /* TODO: Make this render */
      return <Combat />;
    } else {
      setFreeworkers(freeworkers + newWorkersPerTurn);
    }
  }

  /* TODO: Get handleClicks working for each building */
  return (
    <div>
      <h1>Welcome to the game.</h1>
      <div style={{ fontWeight: "bold" }}>Turn Number: {turn}</div>

      <br></br>

      {/* TODO: Hide this during combat */}
      <div className="buildings">
        <div className="building">
          <Building
            type="Woodworkers"
            freeworkers={freeworkers}
            moreFreeworkers={moreFreeworkers}
            lessFreeworkers={lessFreeworkers}
          />
        </div>

        <div className="building">
          <Building
            type="Stoneworkers"
            freeworkers={freeworkers}
            moreFreeworkers={moreFreeworkers}
            lessFreeworkers={lessFreeworkers}
          />
        </div>

        <div className="building">
          <Building
            type="Ironworkers"
            freeworkers={freeworkers}
            moreFreeworkers={moreFreeworkers}
            lessFreeworkers={lessFreeworkers}
          />
        </div>
      </div>

      <br></br>

      <div className="freeworkers" style={{ fontWeight: "bold" }}>
        Free Workers: {freeworkers}
      </div>
      {/* TODO: Have resources gathered from buildings at of end turn */}
      <button onClick={endTurn}>End Turn</button>
    </div>
  );
}
