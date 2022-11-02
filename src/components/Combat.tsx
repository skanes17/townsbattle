import React, { useState } from "react";

// @ts-ignore
export default function Combat(props) {
  function endTurn() {
    // combat is every 4 turns -- change this later
    props.setCombatTurn(props.turn + 4);
    props.setTurn(props.turn + 1);
  }

  const [melee, setMelee] = useState({
    attack: 2,
    defense: 2,
    name: "Melee",
    type: "balanced",
    quantity: 0,
  });
  const [pewpew, setPewpew] = useState({
    attack: 3,
    defense: 1,
    name: "Pewpew",
    type: "ranged",
    quantity: 0,
  });
  const [tanky, setTanky] = useState({
    attack: 1,
    defense: 3,
    name: "Tanky",
    type: "defensive",
    quantity: 0,
  });

  // @ts-ignore
  function trainUnit(unit, setUnit) {
    // @ts-ignore
    setUnit({
      ...unit, // copy other fields
      quantity: unit.quantity + 1,
      /*     setMelee({
      ...melee, // copy other fields
      quantity: melee.quantity + 1, */
    });

    /* setMelee(melee.quantity + 1); */
  }

  return (
    <>
      <h2>You are in combat. It's super fun and you love it.</h2>
      <div className="friendlyUnits" style={{ fontWeight: "bold" }}>
        Friendly Units:
      </div>
      <div>
        <div>
          {melee.name} ({melee.quantity} units)
        </div>
        <div>
          Atk {melee.attack} Def {melee.defense}
        </div>
      </div>
      <br></br>
      <div>
        <div>
          {pewpew.name} ({pewpew.quantity} units)
        </div>
        <div>
          Atk {pewpew.attack} Def {pewpew.defense}
        </div>
      </div>
      <br></br>
      <div>
        <div>
          {tanky.name} ({tanky.quantity} units)
        </div>
        <div>
          Atk {tanky.attack} Def {tanky.defense}
        </div>
      </div>

      <br></br>

      <div className="trainFriendlyUnits">
        {/* Took forever to figure this out */}
        <button onClick={() => trainUnit(melee, setMelee)}>
          Train {melee.name}
        </button>
        <button onClick={() => trainUnit(pewpew, setPewpew)}>
          Train {pewpew.name}
        </button>
        <button onClick={() => trainUnit(tanky, setTanky)}>
          Train {tanky.name}
        </button>
      </div>
      <br></br>

      <div className="enemyUnits" style={{ fontWeight: "bold" }}>
        Enemy Units:
      </div>
      <div>
        <div>
          {melee.name} ({melee.quantity} units)
        </div>
        <div>
          Atk {melee.attack} Def {melee.defense}
        </div>
      </div>
      <br></br>
      <div>
        <div>
          {pewpew.name} ({pewpew.quantity} units)
        </div>
        <div>
          Atk {pewpew.attack} Def {pewpew.defense}
        </div>
      </div>
      <br></br>
      <div>
        <div>
          {tanky.name} ({tanky.quantity} units)
        </div>
        <div>
          Atk {tanky.attack} Def {tanky.defense}
        </div>
      </div>

      <div className="trainEnemyUnits">
        {/* Took forever to figure this out */}
        <button onClick={() => trainUnit(melee, setMelee)}>
          Train {melee.name}
        </button>
        <button onClick={() => trainUnit(pewpew, setPewpew)}>
          Train {pewpew.name}
        </button>
        <button onClick={() => trainUnit(tanky, setTanky)}>
          Train {tanky.name}
        </button>
      </div>

      <br></br>
      <button onClick={endTurn}>End Turn</button>
    </>
  );
}
