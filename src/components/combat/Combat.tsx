import React, { useState } from "react";
import { Phase, Subphase } from "../../types/CombatPhases";
import { Unit } from "../../types/Unit";
import { UnitCounts } from "../../types/UnitCounts";
import AutoButton from "../buttons/AutoButton";
import CombatButton from "../buttons/CombatButton";
import CombatCardTemplate from "../cards/CombatCardTemplate";
import PostCombatSummary from "../cards/PostCombatSummary";
import PreCombatCardTemplate from "../cards/PreCombatCardTemplate";
import ArmyGrid from "./ArmyGrid";
import CombatLog from "./CombatLog";

/* TODO: Figure out how to place enemy units starting from top right in grid */
/* FIXME: Page breaking when army has 0 units */

interface CombatProps {
  myUnits: Unit[];
  enemyUnits: Unit[];
  switchPhase: () => void;
}

export default function Combat({
  myUnits,
  enemyUnits,
  switchPhase,
}: CombatProps) {
  const [phase, setPhase] = useState<Phase>("pre");
  const [subphase, setSubphase] = useState<Subphase>("select");

  // log text output here
  const [logState, setLogState] = useState<string[]>([]);

  const [combatUnits, setCombatUnits] = useState<Unit[]>([...myUnits]);
  const [combatEnemyUnits, setCombatEnemyUnits] = useState<Unit[]>([
    ...enemyUnits,
  ]);

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

  const [friendlyUnit, setFriendlyUnit] = useState(
    combatUnits[Math.floor(Math.random() * combatUnits.length)]
  );
  const [enemyUnit, setEnemyUnit] = useState(
    combatEnemyUnits[Math.floor(Math.random() * combatEnemyUnits.length)]
  );

  const combatMegaFunction = () => {
    switch (phase) {
      case "pre":
        // randomly select a unit from each army
        setFriendlyUnit(
          combatUnits[Math.floor(Math.random() * combatUnits.length)]
        );
        setEnemyUnit(
          combatEnemyUnits[Math.floor(Math.random() * combatEnemyUnits.length)]
        );
        // initiate combat!
        setPhase("combat");
        setSubphase("fight");
        break;
      case "combat":
        switch (subphase) {
          case "select":
            // loop back here if an army survives
            // randomly select a NEW unit from each army
            setFriendlyUnit(
              combatUnits[Math.floor(Math.random() * combatUnits.length)]
            );
            setEnemyUnit(
              combatEnemyUnits[
                Math.floor(Math.random() * combatEnemyUnits.length)
              ]
            );
            setSubphase("fight");
            break;
          case "fight":
            // chosen units attack each other
            /* If health ends up less than zero, set to 0 for display */
            const friendlyHealthRemaining =
              friendlyUnit.maxHealth - enemyUnit.attack;
            const enemyHealthRemaining =
              enemyUnit.maxHealth - friendlyUnit.attack;

            /* FIXME: Combine the state update for selected unit and army? */
            if (friendlyHealthRemaining > 0) {
              setFriendlyUnit({
                ...friendlyUnit,
                currentHealth: friendlyHealthRemaining,
              });
            } else setFriendlyUnit({ ...friendlyUnit, currentHealth: 0 });

            if (enemyHealthRemaining > 0) {
              setEnemyUnit({
                ...enemyUnit,
                currentHealth: enemyHealthRemaining,
              });
            } else setEnemyUnit({ ...enemyUnit, currentHealth: 0 });

            // update army with new unit health
            setCombatUnits(
              combatUnits.map((unit) => {
                // if id matches the currently selected unit, change its health
                if (unit.id === friendlyUnit.id) {
                  if (friendlyHealthRemaining > 0) {
                    return {
                      // if so, change that unit's health/health accordingly
                      ...unit,
                      currentHealth: friendlyHealthRemaining,
                    };
                  }
                  // set minimum unit health to 0
                  else {
                    return {
                      // if so, change that unit's health/health accordingly
                      ...unit,
                      currentHealth: 0,
                    };
                  }
                } else {
                  // if not, don't change anything
                  return unit;
                }
              })
            );

            // set new enemy unit health
            setCombatEnemyUnits(
              combatEnemyUnits.map((unit) => {
                if (unit.id === enemyUnit.id) {
                  if (enemyHealthRemaining > 0) {
                    return {
                      ...unit,
                      currentHealth: enemyHealthRemaining,
                    };
                  } else {
                    return {
                      ...unit,
                      currentHealth: 0,
                    };
                  }
                } else {
                  return unit;
                }
              })
            );

            setSubphase("resolve");
            break;
          case "resolve":
            // if the unit has no health
            if (friendlyUnit.currentHealth === 0) {
              // remove it from their pool
              setCombatUnits(
                combatUnits.filter((unit) => unit.id !== friendlyUnit.id)
              );
            }
            if (enemyUnit.currentHealth === 0) {
              setCombatEnemyUnits(
                combatEnemyUnits.filter((unit) => unit.id !== enemyUnit.id)
              );
            }
            setSubphase("victoryCheck");
            break;

          // return the unit to the army and pick a new one, or not
          case "victoryCheck":
            if (combatUnits.length === 0 || combatEnemyUnits.length === 0) {
              // if an army was defeated, end combat

              setPhase("post");
            } else {
              // if both armies remain, select new units
              setFriendlyUnit(
                combatUnits[Math.floor(Math.random() * combatUnits.length)]
              );
              setEnemyUnit(
                combatEnemyUnits[
                  Math.floor(Math.random() * combatEnemyUnits.length)
                ]
              );
              setSubphase("fight");
            }
            break;
        }
        break;
      case "post":
        // calculate number of units defeated
        // number of units lost
        // number of units injured
        // buildings damaged (and how much?)
        break;
    }
  };

  // TODO: Build autobattler
  const autoBattler = () => {};

  /* FIXME: Need a better approach! Picking through which conditional rendering is a bit tricky. */
  return (
    <body className="grid auto-rows-min grid-cols-12 place-content-stretch gap-3 p-4 md:gap-4 lg:gap-5 xl:gap-8">
      {/* common components to all phases */}
      {/* TODO: Reduce opacity of army grids when combat is over, put a green outline for winner, red for loser? */}
      {/* <ArmyGrid army={testArmy} startColumn="1" /> */}
      <ArmyGrid
        army={combatUnits}
        selectedUnit={friendlyUnit}
        startColumn="1"
      />
      <CombatLog phase={phase} />
      {/* <ArmyGrid army={testEnemyArmy} startColumn="8" /> */}
      <ArmyGrid
        army={combatEnemyUnits}
        selectedUnit={enemyUnit}
        startColumn="8"
      />

      {phase === "post" ? (
        <>
          <div className="center col-span-12 col-start-1 row-start-4 w-5/6 self-center justify-self-center sm:row-start-3 sm:mt-2 md:mt-0">
            <PostCombatSummary />
          </div>
          {/* FIXME: Should really just call button once!! */}
          <div className="col-span-12 flex items-center justify-end">
            <button
              className="text-md rounded border border-white/40 bg-blue-600 p-2 font-bold text-white duration-75 hover:bg-blue-800 sm:text-lg md:text-2xl lg:text-3xl 
                   xl:text-4xl"
              onClick={() => switchPhase()}
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
          {phase === "combat" && <CombatCardTemplate unit={friendlyUnit} />}
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
            {phase === "combat" && subphase === "select" ? (
              <CombatButton
                buttonText="Select!"
                onClick={() => combatMegaFunction()}
              />
            ) : phase === "combat" && subphase === "fight" ? (
              <CombatButton
                buttonText="Fight"
                onClick={() => combatMegaFunction()}
              />
            ) : phase === "combat" && subphase === "resolve" ? (
              <CombatButton
                buttonText="Resolve"
                onClick={() => combatMegaFunction()}
              />
            ) : (
              phase === "combat" &&
              subphase === "victoryCheck" && (
                /* FIXME: Make name depend on state of army (select, summary, etc) */
                <CombatButton
                  buttonText="Again!"
                  onClick={() => combatMegaFunction()}
                />
              )
            )}
          </div>
          {phase === "combat" && (
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
          {phase === "combat" && <CombatCardTemplate unit={enemyUnit} />}
        </div>
      )}
    </body>
  );
}
