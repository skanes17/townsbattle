import React from "react";
import { useState } from "react";

// @ts-ignore
export default function Game(props) {
  const [turn, setTurn] = useState(0);
  const [totalWorkers, setTotalWorkers] = useState(5);
  const [woodworkers, setWoodworkers] = useState(0);
  const [stoneworkers, setStoneworkers] = useState(0);
  const [ironworkers, setIronworkers] = useState(0);
  const isCombatTurn = false;

  function handlePlusClick() {
    setWoodworkers(woodworkers + 1);
    setTotalWorkers(totalWorkers - 1);
    // need to handle workers < 0
  }

  return (
    <div>
      <h1>Welcome to the game.</h1>
      <button onClick={handlePlusClick}>+</button>
      <button>-</button>
      <button>End Turn</button>
      <div>Woodworkers: {woodworkers}</div>
      <div>Stoneworkers: {stoneworkers}</div>
      <div>Ironworkers: {ironworkers}</div>
      <br></br>
      <div style={{ fontWeight: "bold" }}>Total Workers: {totalWorkers}</div>
    </div>
  );
}
