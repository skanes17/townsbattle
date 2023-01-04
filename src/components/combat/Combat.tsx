import React, { useState } from "react";
import { Phase, Subphase } from "../../types/CombatPhases";
import { Unit } from "../../types/Unit";
import { UnitCounts } from "../../types/UnitCounts";
import AutoButton from "../buttons/AutoButton";
import CombatButton from "../buttons/CombatButton";
//TODO: Fix this
// import { AutoButton, CombatButton } from '../buttons';
import CombatCardTemplate from "../cards/CombatCardTemplate";
import PostCombatSummary from "./PostCombatSummary";
import PreCombatCardTemplate from "../cards/PreCombatCardTemplate";
import ArmyGrid from "./ArmyGrid";
import CombatLog from "./CombatLog";

// TODO: Consider adding a button for an auto-play, like it steps forward every 2 seconds or something

/* TODO: Figure out how to place enemy units starting from top right in grid */
/* FIXME: Page breaking when army has 0 units */

/* TODO: Incorporate enums (enumeration) */
/* enum Phases {
  Pre,
  Combat,
  Post,
}

enum SubPhases {
  Fight,
  Resolve,
  VictoryCheck,
} */

interface CombatProps {
  myUnits: Unit[];
  enemyUnits: Unit[];
  setMyUnits: any;
  setEnemyUnits: any;
  switchPhase: () => void;
}

export default function Combat({
  myUnits,
  enemyUnits,
  setMyUnits,
  setEnemyUnits,
  switchPhase,
}: CombatProps) {
  const [phase, setPhase] = useState<Phase>("pre");
  const [subphase, setSubphase] = useState<Subphase>("fight");

  // log text output here
  const [logState, setLogState] = useState<string[]>([]);

  const [combatUnits, setCombatUnits] = useState<Unit[]>([...myUnits]);
  const [combatEnemyUnits, setCombatEnemyUnits] = useState<Unit[]>([
    ...enemyUnits,
  ]);

  /* ======== FOR TESTING ========
  const testMelee: Unit = {
    unitType: "melee",
    name: "Melee",
    nameSymbol: "⚔️",
    description: "Attack and health are balanced.",
    attack: 5,
    maxHealth: 5,
    currentHealth: 4,
    id: 17,
  };

  const testTanky: Unit = {
    unitType: "tanky",
    name: "Tanky",
    nameSymbol: "🛡️",
    description: "Low attack but lots of health.",
    attack: 3,
    maxHealth: 7,
    currentHealth: 1,
  };

  const numberOfFriendlies = 25;
  const numberOfEnemies = 17;

  const testArmy = new Array(numberOfFriendlies).fill(null).map((_) => {
    return testMelee;
  });

  const testEnemyArmy = new Array(numberOfEnemies).fill(null).map((_) => {
    return testTanky;
  });
  ============================= */

  const combatUnitCounts: UnitCounts = {
    melee: combatUnits.filter((unit) => unit.unitType === "melee").length,
    pewpew: combatUnits.filter((unit) => unit.unitType === "pewpew").length,
    tanky: combatUnits.filter((unit) => unit.unitType === "tanky").length,
  };

  const combatEnemyUnitCounts: UnitCounts = {
    melee: enemyUnits.filter((unit) => unit.unitType === "melee").length,
    pewpew: enemyUnits.filter((unit) => unit.unitType === "pewpew").length,
    tanky: enemyUnits.filter((unit) => unit.unitType === "tanky").length,
  };

  // we only want to choose from units that are alive (health not 0)
  // we'll first generate an array of indexes for surviving combat units
  const survivingFriendlyUnitIndexes = combatUnits
    .map((unit, index) => {
      if (unit.currentHealth !== 0) {
        return index;
      } else return -1;
      // FIXME: Better way to do this?
    })
    .filter((index) => index >= 0);

  const survivingEnemyUnitIndexes = combatEnemyUnits
    .map((unit, index) => {
      if (unit.currentHealth !== 0) {
        return index;
      } else return -1;
    })
    .filter((index) => index >= 0);

  // choose an index at random from the surviving units
  const [friendlyIndex, setFriendlyIndex] = useState(
    survivingFriendlyUnitIndexes[
      Math.floor(Math.random() * survivingFriendlyUnitIndexes.length)
    ]
  );
  const [enemyIndex, setEnemyIndex] = useState(
    survivingEnemyUnitIndexes[
      Math.floor(Math.random() * survivingEnemyUnitIndexes.length)
    ]
  );

  const fight = () => {
    // chosen units attack each other

    // FIXME: Simplify this? Still hesitant to modify combatUnits directly
    const _friendlyCopy = [...combatUnits];
    // damage the selected friendly unit; set to 0 if dmg exceeds health
    _friendlyCopy[friendlyIndex].currentHealth = Math.max(
      0,
      _friendlyCopy[friendlyIndex].currentHealth -
        combatEnemyUnits[enemyIndex].attack
    );
    // update army with new unit health
    setCombatUnits(_friendlyCopy);

    const _enemyCopy = [...combatEnemyUnits];
    _enemyCopy[enemyIndex].currentHealth = Math.max(
      0,
      _enemyCopy[enemyIndex].currentHealth - combatUnits[friendlyIndex].attack
    );
    setCombatEnemyUnits(_enemyCopy);
  };

  const selectNewUnits = () => {
    // if both armies remain, select new units
    setFriendlyIndex(
      survivingFriendlyUnitIndexes[
        Math.floor(Math.random() * survivingFriendlyUnitIndexes.length)
      ]
    );
    setEnemyIndex(
      survivingEnemyUnitIndexes[
        Math.floor(Math.random() * survivingEnemyUnitIndexes.length)
      ]
    );
  };

  const sendArmiesToPlanning = () => {
    // send all all surviving units back to planning
    setMyUnits(
      combatUnits
        .map((unit) => {
          if (unit.currentHealth !== 0) {
            return unit;
          }
        })
        .filter((unit) => unit !== undefined)
    );

    // probably unnecessary at this phase but keeping it anyway; can't hurt?
    setEnemyUnits(
      combatEnemyUnits
        .map((unit) => {
          if (unit.currentHealth !== 0) {
            return unit;
          }
        })
        .filter((unit) => unit !== undefined)
    );
  };

  // TODO: If you have no units upon combat:
  // immediately go to post; buildings are damaged accordingly
  const combatMegaFunction = () => {
    switch (phase) {
      case "pre":
        setPhase("combat");
        setSubphase("fight");
        break;
      case "combat":
        switch (subphase) {
          case "fight":
            fight();
            // TODO: Add in animation for units attacking each other
            setSubphase("victoryCheck");
            break;

          case "victoryCheck":
            // return the unit to the army and pick a new one, or not
            // if an army was defeated, end combat
            if (
              survivingFriendlyUnitIndexes.length === 0 ||
              survivingEnemyUnitIndexes.length === 0
            ) {
              // TODO: See below
              // calculate all the stats to present on next screen, such as...
              // number of units defeated
              // number of units lost
              // number of units injured
              // buildings damaged (and how much?)

              setPhase("post");
            } else {
              selectNewUnits();
              setSubphase("fight");
            }
            break;
        }
        break;
      case "post":
        sendArmiesToPlanning();
        switchPhase();
        break;
    }
  };

  // TODO: Test autobattler
  // TODO: Incorporate something like "Auto - 5/10/20 units" or something... so you can batch fights
  const autoBattler = () => {
    const autoFriendlyUnits = [...combatUnits];
    const autoEnemyUnits = [...combatEnemyUnits];
    // TODO: loop until all units on one or both sides are dead

    // gather surviving units
    let _survivingFriendlyUnitIndexes = autoFriendlyUnits
      .map((unit, index) => {
        if (unit.currentHealth !== 0) {
          return index;
        } else return -1;
      })
      .filter((index) => index >= 0);
    let _survivingEnemyUnitIndexes = autoEnemyUnits
      .map((unit, index) => {
        if (unit.currentHealth !== 0) {
          return index;
        } else return -1;
      })
      .filter((index) => index >= 0);

    while (
      _survivingFriendlyUnitIndexes.length > 0 &&
      _survivingEnemyUnitIndexes.length > 0
    ) {
      // choose a unit from each army
      let _friendlyIndex =
        _survivingFriendlyUnitIndexes[
          Math.floor(Math.random() * _survivingFriendlyUnitIndexes.length)
        ];
      let _enemyIndex =
        _survivingEnemyUnitIndexes[
          Math.floor(Math.random() * _survivingEnemyUnitIndexes.length)
        ];

      // reduce their health appropriately
      autoFriendlyUnits[_friendlyIndex].currentHealth = Math.max(
        0,
        autoFriendlyUnits[_friendlyIndex].currentHealth -
          autoEnemyUnits[_enemyIndex].attack
      );
      autoEnemyUnits[_enemyIndex].currentHealth = Math.max(
        0,
        autoEnemyUnits[_enemyIndex].currentHealth -
          autoFriendlyUnits[_friendlyIndex].attack
      );

      // check if units are still alive; if so, continue the loop
      _survivingFriendlyUnitIndexes = autoFriendlyUnits
        .map((unit, index) => {
          if (unit.currentHealth !== 0) {
            return index;
          } else return -1;
        })
        .filter((index) => index >= 0);
      _survivingEnemyUnitIndexes = autoEnemyUnits
        .map((unit, index) => {
          if (unit.currentHealth !== 0) {
            return index;
          } else return -1;
        })
        .filter((index) => index >= 0);
    }

    setCombatUnits(autoFriendlyUnits);
    setCombatEnemyUnits(autoEnemyUnits);
    setPhase("post");
  };

  return (
    <body className="grid auto-rows-min grid-cols-12 place-content-stretch gap-3 p-4 md:gap-4 lg:gap-5 xl:gap-8">
      {/* ArmyGrid & CombatLog are common components to all phases */}
      {/* TODO: Reduce opacity of army grids when combat is over, put a green outline for winner, red for loser? */}
      <ArmyGrid
        phase={phase}
        army={combatUnits}
        selectedUnit={combatUnits[friendlyIndex]}
        startColumn="1"
      />
      <CombatLog phase={phase} />
      <ArmyGrid
        phase={phase}
        army={combatEnemyUnits}
        selectedUnit={combatEnemyUnits[enemyIndex]}
        startColumn="8"
      />

      {phase === "post" ? (
        <>
          <div className="center col-span-12 col-start-1 row-start-4 w-5/6 self-center justify-self-center sm:row-start-3 sm:mt-2 md:mt-0">
            <PostCombatSummary
              friendlyUnits={combatUnits}
              enemyUnits={combatEnemyUnits}
            />
          </div>
          {/* FIXME: Should really just call button once!! */}
          <div className="col-span-12 flex items-center justify-end">
            <button
              className="text-md rounded border border-white/40 bg-blue-600 p-2 font-bold text-white duration-75 hover:bg-blue-800 sm:text-lg md:text-2xl lg:text-3xl 
                   xl:text-4xl"
              onClick={() => combatMegaFunction()}
            >
              Return to Planning
            </button>
          </div>
        </>
      ) : (
        <div className="card col-span-5 col-start-1 row-start-4 mr-4 w-4/5 max-w-xs self-center justify-self-center sm:row-start-3 sm:mt-2 sm:justify-self-end md:mt-0">
          {phase === "pre" && (
            <PreCombatCardTemplate
              headerText="Your Army"
              army={combatUnits}
              unitCounts={combatUnitCounts}
            />
          )}
          {phase === "combat" && (
            <CombatCardTemplate
              unit={combatUnits[friendlyIndex]}
              subphase={subphase}
            />
          )}
        </div>
      )}

      {(phase === "pre" || phase === "combat") && (
        <div className="col-span-2 col-start-6 row-start-4 grid auto-rows-min place-content-center gap-2 sm:row-start-3 sm:mt-2 md:mt-0">
          {phase === "combat" && (
            <div className="mx-auto max-h-24 overflow-y-auto rounded-bl-md rounded-tr-md border border-white/25 p-2 text-center text-xs sm:max-h-full sm:text-sm md:text-base lg:text-lg xl:text-xl">
              {/* TODO: Maybe make this take up 4 columns, pops up as overlap then fades? */}
              <p>
                Random taunts when units battle each other, pop up during fight
                then fade.
              </p>
            </div>
          )}

          <div className="flex items-end justify-center p-4 pb-0">
            {phase === "pre" && (
              <CombatButton
                buttonText="Start"
                onClick={() => combatMegaFunction()}
              />
            )}
            {/* FIXME: Must be a cleaner way?? */}
            {phase === "combat" && subphase === "fight" ? (
              <CombatButton
                buttonText="Fight"
                onClick={() => combatMegaFunction()}
              />
            ) : (
              phase === "combat" &&
              subphase === "victoryCheck" && (
                /* FIXME: Make name depend on state of army (select, summary, etc) */
                <CombatButton
                  buttonText={
                    survivingFriendlyUnitIndexes.length === 0 ||
                    survivingEnemyUnitIndexes.length === 0
                      ? "Summary"
                      : "Again!"
                  }
                  onClick={() => combatMegaFunction()}
                />
              )
            )}
          </div>
          {phase === "combat" && subphase !== "victoryCheck" && (
            <div className="flex items-start justify-center p-4 pt-0">
              <AutoButton buttonText="Auto" onClick={() => autoBattler()} />
            </div>
          )}
        </div>
      )}

      {phase !== "post" && (
        <div className="card col-span-5 col-start-8 row-start-4 ml-4 w-4/5 max-w-xs self-center justify-self-center sm:row-start-3 sm:mt-2 sm:justify-self-start md:mt-0">
          {phase === "pre" && (
            <PreCombatCardTemplate
              headerText="Enemy Army"
              army={combatEnemyUnits}
              unitCounts={combatEnemyUnitCounts}
            />
          )}
          {phase === "combat" && (
            <CombatCardTemplate
              unit={combatEnemyUnits[enemyIndex]}
              subphase={subphase}
            />
          )}
        </div>
      )}
    </body>
  );
}
