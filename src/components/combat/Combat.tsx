import React, { useState } from "react";
import { Phase, Subphase } from "../../types/CombatPhases";
import { Unit } from "../../types/Unit";
import { UnitCounts } from "../../types/UnitCounts";
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
  unitCounts: UnitCounts;
}

export default function Combat({
  myUnits,
  enemyUnits,
  unitCounts,
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

  let friendlyUnit = testArmy[Math.floor(Math.random() * testArmy.length)];
  let enemyUnit =
    combatEnemyUnits[Math.floor(Math.random() * testEnemyArmy.length)];

  /* let friendlyUnit: Unit, enemyUnit: Unit; */
  const combatMegaFunction = () => {
    switch (phase) {
      case "pre":
        // randomly select a unit from each army
        friendlyUnit =
          combatUnits[Math.floor(Math.random() * combatUnits.length)];
        enemyUnit =
          combatEnemyUnits[Math.floor(Math.random() * combatEnemyUnits.length)];
        setPhase("combat");
        // jump directly to fight subphase because units are already selected
        setSubphase("fight");
        break;
      case "combat":
        // fight
        // resolve
        // check if battle is over
        // if true^, enter "post" phase
        switch (subphase) {
          case "select":
            // loop back here if an army survives
            // randomly select a NEW unit from each army
            friendlyUnit =
              combatUnits[Math.floor(Math.random() * combatUnits.length)];
            enemyUnit =
              combatEnemyUnits[
                Math.floor(Math.random() * combatEnemyUnits.length)
              ];
            setSubphase("fight");
            break;
          case "fight":
            // chosen units attack each other
            /* If health ends up less than zero, set to 0 for display */
            let friendlyHealthRemaining =
              friendlyUnit.currentHealth - enemyUnit.attack;
            if (friendlyHealthRemaining < 0) {
              friendlyHealthRemaining = 0;
            }

            // set new unit health
            setCombatUnits(
              combatUnits.map((unit) => {
                // check if id matches the currently selected unit
                if (unit.id === friendlyUnit.id) {
                  return {
                    // if so, change that unit's health/health accordingly
                    ...unit,
                    currentHealth: friendlyHealthRemaining,
                  };
                } else {
                  // if not, don't change anything
                  return unit;
                }
              })
            );

            let enemyHealthRemaining =
              enemyUnit.currentHealth - friendlyUnit.attack;
            if (enemyHealthRemaining < 0) {
              enemyHealthRemaining = 0;
            }

            // set new enemy unit health
            setCombatEnemyUnits(
              combatEnemyUnits.map((unit) => {
                if (unit.id === enemyUnit.id) {
                  return {
                    ...unit,
                    currentHealth: enemyHealthRemaining,
                  };
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
                combatUnits.filter((unit) => unit.id !== enemyUnit.id)
              );
            }

            if (enemyUnit.currentHealth === 0) {
              setCombatEnemyUnits(
                combatEnemyUnits.filter((unit) => unit.id !== enemyUnit.id)
              );
            }
            // return the unit to the army and pick a new one, or not

            setSubphase("victoryCheck");
            break;
          case "victoryCheck":
            if (combatUnits.length === 0 || combatEnemyUnits.length === 0) {
              // if an army was defeated, end combat

              setPhase("post");
            } else {
              // if both armies remain, select new units
              setSubphase("select");
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

  return (
    <body className="grid auto-rows-min grid-cols-12 place-content-stretch gap-3 p-4 md:gap-4 lg:gap-5 xl:gap-8">
      {/* common components to all phases */}
      {/* TODO: Reduce opacity of army grids when combat is over, put a green outline for winner, red for loser? */}
      <ArmyGrid army={testArmy} startColumn="1" />
      {/* <ArmyGrid army={combatUnits} startColumn="1" /> */}
      <CombatLog phase={phase} />
      <ArmyGrid army={testEnemyArmy} startColumn="8" />
      {/* <ArmyGrid army={enemyUnits} startColumn="8" /> */}

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
              army={testArmy}
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
                buttonText="Next"
                onClick={() => combatMegaFunction()}
              />
            ) : (
              phase === "combat" &&
              subphase === "victoryCheck" && (
                /* FIXME: Make name depend on state of army (select, summary, etc) */
                <CombatButton
                  buttonText="Next"
                  onClick={() => combatMegaFunction()}
                />
              )
            )}
          </div>
          {phase === "combat" && (
            <div className="flex items-start justify-center p-4 pt-0">
              <button
                className="h-6 w-10 rounded border border-white/40 bg-red-600 text-sm font-bold text-white duration-75 hover:bg-red-800 sm:h-6 sm:w-12 sm:text-sm md:h-10 md:w-20 md:text-base lg:h-12 lg:w-20 lg:text-xl xl:h-14 xl:w-24
                   xl:text-2xl"
                onClick={() => autoBattler()}
              >
                Auto
              </button>
            </div>
          )}
        </div>
      )}

      {phase !== "post" && (
        <div className="card col-span-5 col-start-8 row-start-4 ml-4 w-4/5 max-w-xs self-center justify-self-center sm:row-start-3 sm:mt-2 sm:justify-self-start md:mt-0">
          {phase === "pre" && (
            <PreCombatCardTemplate
              headerText="Enemy Army"
              army={testEnemyArmy}
              unitCounts={combatEnemyUnitCounts}
            />
          )}
          {phase === "combat" && <CombatCardTemplate unit={enemyUnit} />}
        </div>
      )}
    </body>
  );
}
