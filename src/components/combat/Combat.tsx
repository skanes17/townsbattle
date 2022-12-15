import React, { useState } from "react";
import { Phase } from "../../types/CombatPhases";
import { Unit } from "../../types/Unit";
import { UnitCounts } from "../../types/UnitCounts";
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
  // TODO: use 0 for this when the UI is created
  const [phase, setPhase] = useState<Phase>("post");
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

  const friendlyUnit = testArmy[Math.floor(Math.random() * testArmy.length)];
  /* const friendlyUnit = combatUnits[Math.floor(Math.random() * combatUnits.length)]; */
  const enemyUnit =
    testEnemyArmy[Math.floor(Math.random() * testEnemyArmy.length)];
  /* const enemyUnit = enemyUnits[Math.floor(Math.random() * enemyUnits.length)]; */

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
              onClick={() => ""}
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
                Possible flavour text here, sometimes. Maybe. It depends. What'd
                you like?
              </p>
            </div>
          )}

          <div className="flex items-end justify-center p-4 pb-0">
            {phase === "pre" && (
              <button
                className="text-md h-8 w-16 rounded border border-white/40 bg-blue-600 font-bold text-white duration-75 hover:bg-blue-800 sm:h-12 sm:w-20 sm:text-lg md:h-16 md:w-24 md:text-2xl lg:h-20 lg:w-32 lg:text-3xl xl:h-24 xl:w-40
                   xl:text-4xl"
                onClick={() => ""}
              >
                Start
              </button>
            )}
            {phase === "combat" && (
              <button
                className="text-md h-8 w-16 rounded border border-white/40 bg-blue-600 font-bold text-white duration-75 hover:bg-blue-800 sm:h-12 sm:w-20 sm:text-lg md:h-16 md:w-24 md:text-2xl lg:h-20 lg:w-32 lg:text-3xl xl:h-24 xl:w-40
                   xl:text-4xl"
                onClick={() => ""}
              >
                Fight!
              </button>
            )}
          </div>
          {phase === "combat" && (
            <div className="flex items-start justify-center p-4 pt-0">
              <button
                className="h-6 w-10 rounded border border-white/40 bg-red-600 text-sm font-bold text-white duration-75 hover:bg-red-800 sm:h-6 sm:w-12 sm:text-sm md:h-10 md:w-20 md:text-base lg:h-12 lg:w-20 lg:text-xl xl:h-14 xl:w-24
                   xl:text-2xl"
                onClick={() => ""}
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
