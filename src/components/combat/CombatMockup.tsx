import React, { useState } from "react";
import { Unit } from "../../types/Unit";
import CombatCardTemplate from "../cards/CombatCardTemplate";
import ArmyGrid from "./ArmyGrid";
import CombatLog from "./CombatLog";

/* TODO: Figure out how to place friendly divs in grid form, enemies start from top right */

interface CombatMockupProps {
  myUnits: Unit[];
}

export default function CombatMockup({ myUnits }: CombatMockupProps) {
  const [combatUnits, setCombatUnits] = useState<Unit[]>([...myUnits]);

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
  const enemyUnit =
    testEnemyArmy[Math.floor(Math.random() * testEnemyArmy.length)];

  return (
    <body className="grid auto-rows-min grid-cols-12 place-content-stretch gap-3 p-4 md:gap-4 lg:gap-5 xl:gap-8">
      <ArmyGrid army={testArmy} startColumn="1" />
      <CombatLog />
      <ArmyGrid army={testEnemyArmy} startColumn="8" />

      <div className="card col-span-5 col-start-1 row-start-4 mr-4 w-4/5 max-w-xs self-center justify-self-center sm:row-start-3 sm:mt-2 sm:justify-self-end md:mt-0">
        <CombatCardTemplate unit={friendlyUnit} />
      </div>

      <div className="col-span-2 col-start-6 row-start-4 grid auto-rows-min place-content-center gap-2 sm:row-start-3 sm:mt-2 md:mt-0">
        <div className="mx-auto max-h-24 overflow-y-auto rounded-bl-md rounded-tr-md border border-white/25 p-2 text-center text-xs sm:max-h-full sm:text-sm md:text-base lg:text-lg xl:text-xl">
          {/* TODO: Maybe make this take up 4 columns, pops up as overlap then fades? */}
          <p>
            Possible flavour text here, sometimes. Maybe. It depends. What'd you
            like?
          </p>
        </div>

        <div className="flex items-end justify-center p-4 pb-0">
          <button
            className="text-md h-8 w-16 rounded border border-white/40 bg-blue-600 font-bold text-white duration-75 hover:bg-blue-800 sm:h-12 sm:w-20 sm:text-lg md:h-16 md:w-24 md:text-2xl lg:h-20 lg:w-32 lg:text-3xl xl:h-24 xl:w-40
                 xl:text-4xl"
            onClick={() => ""}
          >
            Fight!
          </button>
        </div>
        <div className="flex items-start justify-center p-4 pt-0">
          <button
            className="h-6 w-10 rounded border border-white/40 bg-red-600 text-sm font-bold text-white duration-75 hover:bg-red-800 sm:h-6 sm:w-12 sm:text-sm md:h-10 md:w-20 md:text-base lg:h-12 lg:w-20 lg:text-xl xl:h-14 xl:w-24
                 xl:text-2xl"
            onClick={() => ""}
          >
            Auto
          </button>
        </div>
      </div>

      <div className="card col-span-5 col-start-8 row-start-4 ml-4 w-4/5 max-w-xs self-center justify-self-center sm:row-start-3 sm:mt-2 sm:justify-self-start md:mt-0">
        <CombatCardTemplate unit={enemyUnit} />
      </div>
    </body>
  );
}
