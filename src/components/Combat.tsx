import React, { useState } from "react";

// @ts-ignore
export default function Combat(props) {
  function endTurn() {
    // combat is every 4 turns -- change this later
    props.setCombatTurn(props.turn + 4);
    props.setTurn(props.turn + 1);
  }

  // friendlies -- optimize later
  const [melee1, setMelee1] = useState({
    attack: 2,
    defense: 2,
    name: "Melee",
    type: "balanced",
    quantity: 0,
  });
  const [pewpew1, setPewpew1] = useState({
    attack: 3,
    defense: 1,
    name: "Pewpew",
    type: "ranged",
    quantity: 0,
  });
  const [tanky1, setTanky1] = useState({
    attack: 1,
    defense: 3,
    name: "Tanky",
    type: "defensive",
    quantity: 0,
  });

  // enemies -- optimize later
  const [melee2, setMelee2] = useState({
    attack: 2,
    defense: 2,
    name: "Melee",
    type: "balanced",
    quantity: 0,
  });
  const [pewpew2, setPewpew2] = useState({
    attack: 3,
    defense: 1,
    name: "Pewpew",
    type: "ranged",
    quantity: 0,
  });
  const [tanky2, setTanky2] = useState({
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
    });
  }

  return (
    <>
      <h2>You are in combat.</h2>
      <div className="friendlyUnits" style={{ fontWeight: "bold" }}>
        Friendly Units:
      </div>
      <div>
        <div>
          {melee1.name} ({melee1.quantity} units)
        </div>
        <div>
          Atk {melee1.attack} Def {melee1.defense}
        </div>
      </div>
      <br></br>
      <div>
        <div>
          {pewpew1.name} ({pewpew1.quantity} units)
        </div>
        <div>
          Atk {pewpew1.attack} Def {pewpew1.defense}
        </div>
      </div>
      <br></br>
      <div>
        <div>
          {tanky1.name} ({tanky1.quantity} units)
        </div>
        <div>
          Atk {tanky1.attack} Def {tanky1.defense}
        </div>
      </div>

      <br></br>

      <div className="trainFriendlyUnits">
        {/* Took forever to figure this out */}
        <button onClick={() => trainUnit(melee1, setMelee1)}>
          Train {melee1.name}
        </button>
        <button onClick={() => trainUnit(pewpew1, setPewpew1)}>
          Train {pewpew1.name}
        </button>
        <button onClick={() => trainUnit(tanky1, setTanky1)}>
          Train {tanky1.name}
        </button>
      </div>
      <br></br>

      <div className="enemyUnits" style={{ fontWeight: "bold" }}>
        Enemy Units:
      </div>
      <div>
        <div>
          {melee2.name} ({melee2.quantity} units)
        </div>
        <div>
          Atk {melee2.attack} Def {melee2.defense}
        </div>
      </div>
      <br></br>
      <div>
        <div>
          {pewpew2.name} ({pewpew2.quantity} units)
        </div>
        <div>
          Atk {pewpew2.attack} Def {pewpew2.defense}
        </div>
      </div>
      <br></br>
      <div>
        <div>
          {tanky2.name} ({tanky2.quantity} units)
        </div>
        <div>
          Atk {tanky2.attack} Def {tanky2.defense}
        </div>
      </div>

      <div className="trainEnemyUnits">
        {/* Took forever to figure this out */}
        <button onClick={() => trainUnit(melee2, setMelee2)}>
          Train {melee2.name}
        </button>
        <button onClick={() => trainUnit(pewpew2, setPewpew2)}>
          Train {pewpew2.name}
        </button>
        <button onClick={() => trainUnit(tanky2, setTanky2)}>
          Train {tanky2.name}
        </button>
      </div>

      {/* TODO: Implement direct combat between units, w/randomization etc */}

      <br></br>
      <button onClick={endTurn}>End Turn</button>
    </>
  );
}
