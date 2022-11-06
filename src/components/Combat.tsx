// @ts-nocheck
import React, { useState } from "react";

// TODO: Implement chance to hit? Could be upgraded?
// TODO: Implement armor? First x units get +1 health, etc

export default function Combat({
  turn,
  setCombatTurn,
  setTurn,
  meleeCounter,
  pewpewCounter,
  tankyCounter,
  onClick,
}) {
  function endTurn() {
    // combat is every 4 turns -- change this later
    setCombatTurn(turn + 4);
    setTurn(turn + 1);
  }

  return (
    <div>
      <h2 className="text-4xl font-extrabold dark:text-white">
        Combat Mechanics
      </h2>
      <div>
        <p>Your army size is {meleeCounter + pewpewCounter + tankyCounter}.</p>
        <p>
          {meleeCounter} melee, {pewpewCounter} pewpew, {tankyCounter} tanky.
        </p>
        <button
          onClick={unitBattler}
          className="bg-white hover:bg-gray-100 text-gray-800 font-semibold py-1 px-2 border border-gray-400 rounded shadow"
        >
          Fight!
        </button>
        // TODO: Add End Turn button
      </div>
    </div>
  );
}
