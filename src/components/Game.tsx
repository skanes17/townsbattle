import React from "react";
import { useState } from "react";
// TODO: import Combat from "./Combat";?

// @ts-ignore
export default function Game(props) {
  const [turn, setTurn] = useState(1);
  const [newWorkersPerTurn, setNewWorkersPerTurn] = useState(1);
  const [freeworkers, setFreeworkers] = useState(5);
  const [woodworkers, setWoodworkers] = useState(0);
  const [stoneworkers, setStoneworkers] = useState(0);
  const [ironworkers, setIronworkers] = useState(0);
  const [combatTurn, setCombatTurn] = useState(4);

  function handlePlusClick() {
    setWoodworkers(woodworkers + 1);
    setFreeworkers(freeworkers - 1);
    // need to handle workers < 0
  }

  function handleMinusClick() {
    setWoodworkers(woodworkers - 1);
    setFreeworkers(freeworkers + 1);
    // need to handle workers < 0
  }

  function endTurn() {
    setTurn(turn + 1);
    if (turn === combatTurn) {
      alert("Combat time!");
      // render <CombatPhase />
      // TODO: Ask why it doesn't fire when I expect it to
    } else setFreeworkers(freeworkers + 1);
  }

  return (
    <div>
      <h1>Welcome to the game.</h1>

      <div className="buildings">
        <div className="woodworkers">
          <button onClick={handlePlusClick}>+</button>
          <button onClick={handleMinusClick}>-</button>
          <div>Woodworkers: {woodworkers}</div>
        </div>
        <div className="stoneworkers">Stoneworkers: {stoneworkers}</div>
        <div className="ironworkers">Ironworkers: {ironworkers}</div>
      </div>

      <div className="freeworkers" style={{ fontWeight: "bold" }}>
        Free Workers: {freeworkers}
      </div>
      <button onClick={endTurn}>End Turn</button>
      <div style={{ fontWeight: "bold" }}>Turn Number: {turn}</div>
    </div>

    /* TODO: Get Combat component importing correctly
    <Combat /> */
  );
}
