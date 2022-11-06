// @ts-nocheck
import React, { useState } from "react";

// TODO: Implement chance to hit which can be upgraded
// TODO: Implement armor? First x units get +1 health, etc

export default function Combat({
  turn,
  setCombatTurn,
  setTurn,
  meleeCounter,
  setMeleeCounter,
  pewpewCounter,
  setPewpewCounter,
  tankyCounter,
  setTankyCounter,
}) {
  function endTurn() {
    // combat is every 4 turns -- change this later
    setCombatTurn(turn + 4);
    setTurn(turn + 1);
  }

  function Fight() {
    // choose a unit at random from the array -- same for enemy side
    // FIGHT -- {friendlyDef - enemyAtk > 0 ? pool it : dead and quantity - 1}
    // repeat for enemy
    // go again until one side has an empty array

    return <div>[friendly unit name] vs. [enemy unit name]</div>;
  }

  return (
    <>
      <h2 className="text-4xl font-extrabold dark:text-white">
        Combat Mechanics
      </h2>

      <p>Your army size is {meleeCounter + pewpewCounter + tankyCounter}.</p>
      <p>
        {meleeCounter} melee, {pewpewCounter} pewpew, {tankyCounter} tanky.
      </p>
    </>
  );
}
