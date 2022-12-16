import React, { useState } from "react";
import { Phase, Subphase } from "../../types/CombatPhases";
import { Unit } from "../../types/Unit";
import { UnitCounts } from "../../types/UnitCounts";
import AutoButton from "../buttons/AutoButton";
import CombatButton from "../buttons/CombatButton";
//TODO: Fix this
// import { AutoButton, CombatButton } from '../buttons';
import CombatCardTemplate from "../cards/CombatCardTemplate";
import PostCombatSummary from "../cards/PostCombatSummary";
import PreCombatCardTemplate from "../cards/PreCombatCardTemplate";
import ArmyGrid from "./ArmyGrid";
import CombatLog from "./CombatLog";

/* TODO: Figure out how to place enemy units starting from top right in grid */
/* FIXME: Page breaking when army has 0 units */

/* TODO: Incorporate enums (enumeration) */
enum Phases {
  Pre,
  Combat,
  Post,
}

enum SubPhases {
  Fight,
  Resolve,
  VictoryCheck,
}

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

  // FIXME: How can I avoid choosing units here without later instances being undefined?
  /* FIXME: Problem with Tankys?? Combat won't end */
  const [friendlyUnit, setFriendlyUnit] = useState(
    combatUnits[Math.floor(Math.random() * combatUnits.length)]
  );
  const [enemyUnit, setEnemyUnit] = useState(
    combatEnemyUnits[Math.floor(Math.random() * combatEnemyUnits.length)]
  );

  /* FIXME: Choose units based on array index */
  // keep everything in an array (state)
  // arrayIdx (state)
  // 'current' unit, is just army[idx]
  // army[idx].health - 10;

  // TODO: If you have no units upon combat:
  // immediately go to post, buildings are damaged accordingly
  const combatMegaFunction = () => {
    switch (phase) {
      case "pre":
        // preCombat()
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
          case "fight":
            // chosen units attack each other
            /* If health ends up less than zero, set to 0 for display */
            const friendlyHealthRemaining =
              friendlyUnit.maxHealth - enemyUnit.attack;
            const enemyHealthRemaining =
              enemyUnit.maxHealth - friendlyUnit.attack;

            /* FIXME: Combine the state update for selected unit and army? */

            setFriendlyUnit({
              ...friendlyUnit,
              /* If health ends up less than zero, set to 0 for display */
              currentHealth: Math.max(0, friendlyHealthRemaining),
            });

            setEnemyUnit({
              ...enemyUnit,
              currentHealth: Math.max(0, enemyHealthRemaining),
            });

            // update army with new unit health
            setCombatUnits(
              combatUnits.map((unit) => {
                // if id matches the currently selected unit, change its health
                if (unit.id === friendlyUnit.id) {
                  return {
                    // if so, change that unit's health/health accordingly
                    ...unit,
                    currentHealth: Math.max(0, friendlyHealthRemaining),
                  };
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
                  return {
                    ...unit,
                    currentHealth: Math.max(0, enemyHealthRemaining),
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

              // calculate all the stats to present on next screen, such as...
              // number of units defeated
              // number of units lost
              // number of units injured
              // buildings damaged (and how much?)

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
        /* TODO: Hook up "Return to Planning" button here? */
        setMyUnits(combatUnits);
        setEnemyUnits(combatEnemyUnits);

        switchPhase();
        break;
    }
  };

  // TODO: Build autobattler
  const autoBattler = () => {};

  /* FIXME: Need a better approach! Picking through which conditional rendering is a bit tricky. */
  return (
    <body className="grid auto-rows-min grid-cols-12 place-content-stretch gap-3 p-4 md:gap-4 lg:gap-5 xl:gap-8">
      {/* ArmyGrid & CombatLog are common components to all phases */}
      {/* TODO: Reduce opacity of army grids when combat is over, put a green outline for winner, red for loser? */}
      <ArmyGrid
        phase={phase}
        army={combatUnits}
        selectedUnit={friendlyUnit}
        startColumn="1"
      />
      <CombatLog phase={phase} />
      <ArmyGrid
        phase={phase}
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
            <CombatCardTemplate unit={friendlyUnit} subphase={subphase} />
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
                  buttonText={
                    combatUnits.length === 0 || combatEnemyUnits.length === 0
                      ? "Summary"
                      : "Again!"
                  }
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
          {phase === "combat" && (
            <CombatCardTemplate unit={enemyUnit} subphase={subphase} />
          )}
        </div>
      )}
    </body>
  );
}
