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
      <button
        onClick={unitBattler}
        className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
      >
        Fight!
      </button>
      <div>
        <div>
          <p>
            Your army size is {meleeCounter + pewpewCounter + tankyCounter}.
          </p>
          <p>
            {meleeCounter} melee, {pewpewCounter} pewpew, {tankyCounter} tanky.
          </p>
        </div>
        <div>
          <p>
            The enemy army size is{" "}
            {/* {enemyMeleeCounter + enemyPewpewCounter + enemyTankyCounter} */}
            .
          </p>
          <p>
            {/* {meleeCounter} melee, {pewpewCounter} pewpew, {tankyCounter} tanky. // TODO: Make these percents?*/}
          </p>
        </div>

        {/* TODO: Add End Turn button */}
        <AddUnitButton
          addUnitFunction={addMelee}
          name="Melee"
          className="bg-white hover:bg-gray-100 text-gray-800 font-semibold py-1 px-2 border border-gray-400 rounded shadow"
        />
        <AddUnitButton
          addUnitFunction={addPewpew}
          name="Pewpew"
          className="bg-white hover:bg-gray-100 text-gray-800 font-semibold py-1 px-2 border border-gray-400 rounded shadow"
        />
        <AddUnitButton
          addUnitFunction={addTanky}
          name="Tanky"
          className="bg-white hover:bg-gray-100 text-gray-800 font-semibold py-1 px-2 border border-gray-400 rounded shadow"
        />
      </div>
    </div>
  );
}
