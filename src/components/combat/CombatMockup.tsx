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

  const testArmy = new Array(17).fill(null).map((_) => {
    return testMelee;
  });

  return (
    // grid for the whole page
    <body className="grid grid-cols-12 grid-rows-4 place-content-stretch gap-2 p-4">
      {/* sub grid to control squares for units -- use different sizes per screen*/}
      <div className="square col-span-4 col-start-1 row-span-2 row-start-1 mx-auto grid w-full max-w-sm auto-rows-min grid-cols-2 gap-1 self-center overflow-y-auto overflow-x-hidden bg-blue-500/5 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6">
        {testArmy.map((unit) => (
          <UnitTile unit={unit} />
        ))}
      </div>
      <tbody className="col-span-4 col-start-5 row-span-2 row-start-1 aspect-[5/4] w-full self-center overflow-y-auto rounded-lg bg-gray-500/10 p-4 text-xs sm:text-sm lg:text-lg xl:aspect-[5/3]">
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
      <div className="square end min col-span-4 col-start-9 row-span-2 row-start-1 mx-auto grid w-full max-w-sm auto-rows-min grid-cols-2 gap-1 self-center overflow-y-auto overflow-x-hidden bg-red-500/5 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6">
        {testArmy.map((unit) => (
          <UnitTile unit={unit} />
        ))}
      </div>

      {/* TODO: Component this up! */}
      <div className="card col-span-5 col-start-1 row-span-3 row-start-3 mr-4 w-4/5 max-w-xs justify-self-end rounded-md bg-blue-400/20 px-4">
        <CombatCardTemplate>
          <div
            className={`col-span-3 self-center text-center text-5xl font-bold`}
          >
            Melee
          </div>

          <div
            className={`col-span-3 items-center self-center text-center text-[10rem] font-bold`}
          >
            ⚔️
          </div>

          <div className={`m-3 self-end whitespace-nowrap text-start text-4xl`}>
            🗡️{/*  */}5
          </div>

          <div></div>

          {/* TODO: Conditional green for full, orange for damaged, red for critical */}
          <div
            className={`m-3 self-end whitespace-nowrap text-end text-4xl text-orange-600`}
          >
            ❤️{/*  */}4
          </div>
        </CombatCardTemplate>
      </div>

      <div className=" md:text-md col-span-4 col-start-5 row-start-3 flex h-full w-1/2 items-center place-self-center bg-gray-200/10 p-2 text-center text-xs sm:text-sm lg:text-lg xl:text-xl">
        <p>
          Possible flavour text here, sometimes. Maybe. It depends. What'd you
          like?
        </p>
      </div>

      <div className="col-span-2 col-start-6 row-start-4 mx-auto p-4">
        <div className="flex justify-center">
          <button
            className="mb-4 h-20 w-32 rounded border border-white/40 bg-blue-600 py-2 px-4 text-xl font-bold text-white duration-75
                 hover:bg-blue-800 active:scale-100"
            onClick={() => ""}
          >
            Fight!
          </button>
        </div>
        <div className="flex justify-center">
          <button
            className="rounded border border-white/40 bg-red-600 py-2 px-4 text-xl font-bold text-white duration-75
                 hover:bg-red-800 active:scale-100"
            onClick={() => ""}
          >
            Auto
          </button>
        </div>
      </div>

      <div className="card col-span-5 col-start-8 row-span-3 row-start-3 ml-4 w-4/5 max-w-xs justify-self-start rounded-md bg-red-400/20 px-4">
        <CombatCardTemplate>
          <div
            className={`col-span-3 self-center text-center text-5xl font-bold`}
          >
            Tanky
          </div>

          <div
            className={`col-span-3 items-center self-center text-center text-[10rem] font-bold`}
          >
            🛡️
          </div>

          <div className={`m-3 self-end whitespace-nowrap text-start text-4xl`}>
            🗡️{/*  */}3
          </div>

          <div></div>

          {/* TODO: Conditional green for full, orange for damaged, red for critical */}
          <div
            className={`m-3 self-end whitespace-nowrap text-end text-4xl text-black`}
          >
            ❤️{/*  */}7
          </div>
        </CombatCardTemplate>
      </div>
    </body>
  );
}
