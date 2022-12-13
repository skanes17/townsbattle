import React, { useState } from "react";
import { Unit } from "../../types/Unit";
import AddRemoveButton from "../buttons/AddRemoveButton";
import Button from "../buttons/Button";
import CardDescription from "../cards/CardDescription";
import CardSymbol from "../cards/CardSymbol";
import CardTemplate from "../cards/CardTemplate";
import CombatCardTemplate from "../cards/CombatCardTemplate";
import TrainUnitCardHeader from "../cards/TrainUnitCardHeader";
import UnitTile from "./UnitTile";

/* TODO: Figure out how to place friendly divs in grid form, enemies start from top right */

interface CombatMockup {
  myUnits: Unit[];
}

export default function CombatMockup({ myUnits }: CombatMockup) {
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

  const testArmy = new Array(70).fill(null).map((_) => {
    return testMelee;
  });

  return (
    // grid for the whole page
    <body className="grid auto-rows-min grid-cols-12 place-content-stretch gap-3 p-4 md:gap-4 lg:gap-5 xl:gap-8">
      {/* sub grid to control squares for units -- use different sizes per screen*/}
      <div className="col-span-5 col-start-1 row-span-2 row-start-2 mx-auto grid h-full max-h-48 w-full max-w-sm snap-y auto-rows-min grid-cols-3 gap-1 self-center overflow-y-auto overflow-x-hidden bg-blue-500/5 sm:col-span-4 sm:row-start-1 sm:aspect-square sm:max-h-full md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6">
        {testArmy.map((unit) => (
          <UnitTile unit={unit} />
        ))}
      </div>
      <tbody className="col-span-12 col-start-1 row-start-1 aspect-video max-h-32 w-full self-center overflow-y-auto rounded-lg bg-gray-500/10 p-4 text-sm sm:col-span-4 sm:col-start-5 sm:row-span-2 sm:row-start-1 sm:h-5/6 sm:max-h-full sm:w-full sm:text-sm lg:text-lg xl:aspect-[5/3]">
        <tr className="py-1 text-white odd:bg-white/5">
          The enemy army has reached Gabenfort!
        </tr>
        <tr className="py-1 text-amber-400 odd:bg-white/5">
          Gary Longshanks (melee) faces off against Orga Thrung (tanky).
        </tr>
        <tr className="py-1 text-green-400  odd:bg-white/5">
          Gary Longshanks does 3 damage to the enemy tanky.
        </tr>
        <tr className="py-1 text-red-600  odd:bg-white/5">
          Orga Thrung retaliates with a savage 7 damage.
        </tr>
        <tr className="py-1 text-red-300  odd:bg-white/5">
          Gary Longshanks falls!
        </tr>
        {/* <tr className="py-1 text-amber-400  odd:bg-white/5">
          Peter Whislequill (pewpew) faces off against Gygor Grunch(melee).
        </tr>
        <tr className="py-1 text-green-400">
          Peter Whislequill does 7 damage to Gygor Grunch.
        </tr>
        <tr className="py-1 text-red-500">
          Gygor takes a mean swing back at peter Whistlequill, but misses!
        </tr>
        <tr className="py-1 text-amber-400">
          Both units survive and return to their armies.
        </tr> */}
      </tbody>
      <div className="col-span-5 col-start-8 row-span-2 row-start-2 mx-auto grid h-full max-h-48 w-full max-w-sm snap-y auto-rows-min grid-cols-3 gap-1 self-center overflow-y-auto overflow-x-hidden bg-blue-500/5 sm:col-span-4 sm:row-start-1 sm:aspect-square sm:max-h-full md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6">
        {testArmy.map((unit) => (
          <UnitTile unit={unit} />
        ))}
      </div>

      {/* TODO: Component this up! */}
      <div className="card col-span-5 col-start-1 row-start-4 mr-4 w-4/5 max-w-xs self-center justify-self-center sm:row-start-3 sm:mt-2 sm:justify-self-end md:mt-0">
        <CombatCardTemplate>
          <div
            className={`col-span-3 self-center text-center text-base font-bold sm:text-3xl md:text-4xl lg:text-5xl`}
          >
            Melee
          </div>

          <div
            className={`col-span-3 items-center self-center text-center text-4xl font-bold sm:text-8xl md:text-9xl lg:text-[10rem]`}
          >
            ⚔️
          </div>

          <div className="col-span-3 flex justify-between">
            <div
              className={`self-end text-center text-xl sm:m-3 sm:text-2xl md:text-4xl lg:text-5xl`}
            >
              🗡️{/*  */}5
            </div>
            {/* TODO: Conditional green for full, orange for damaged, red for critical */}
            <div
              className={`self-end text-center text-xl text-orange-600 sm:m-3 sm:text-2xl md:text-4xl lg:text-5xl`}
            >
              ❤️{/*  */}4
            </div>
          </div>
        </CombatCardTemplate>
      </div>

      {/* TODO: Work on me next! Get it responsive, not breaking at small content sizes */}
      <div className="col-span-2 col-start-6 row-start-4 grid auto-rows-min place-content-center gap-2 sm:row-start-3 sm:mt-2 md:mt-0">
        <div className="mx-auto max-h-24 overflow-y-auto bg-gray-200/10 text-center text-xs sm:max-h-full sm:text-sm md:text-base lg:text-lg xl:text-xl">
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
        <CombatCardTemplate>
          <div
            className={`col-span-3 self-center text-center text-base font-bold sm:text-3xl md:text-4xl lg:text-5xl`}
          >
            Tanky
          </div>

          <div
            className={`col-span-3 items-center self-center text-center text-4xl font-bold sm:text-8xl md:text-9xl lg:text-[10rem]`}
          >
            🛡️
          </div>

          <div className="col-span-3 flex justify-between">
            <div
              className={`self-end text-center text-xl sm:m-3 sm:text-2xl md:text-4xl lg:text-5xl`}
            >
              🗡️{/*  */}3
            </div>
            {/* TODO: Conditional green for full, orange for damaged, red for critical */}
            <div
              className={`self-end text-center text-xl text-orange-600 sm:m-3 sm:text-2xl md:text-4xl lg:text-5xl`}
            >
              ❤️{/*  */}7
            </div>
          </div>
        </CombatCardTemplate>
      </div>
    </body>
  );
}
