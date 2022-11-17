import React from "react";
import AddUnitButton from "./AddUnitButton";

interface AddUnits_Props {
  addMelee: () => void;
  addPewpew: () => void;
  addTanky: () => void;
  addEnemyMelee: () => void;
  addEnemyPewpew: () => void;
  addEnemyTanky: () => void;
}

export default function AddUnits({
  addMelee,
  addPewpew,
  addTanky,
  addEnemyMelee,
  addEnemyPewpew,
  addEnemyTanky,
}: AddUnits_Props) {
  return (
    <>
      <h2 className="text-4xl font-extrabold dark:text-white">
        Add Units (Tool)
      </h2>{" "}
      <div>
        <AddUnitButton
          addUnitFunction={addMelee}
          name="Melee"
          className="bg-white hover:bg-gray-100 text-gray-800 font-semibold py-1 px-2 border border-gray-400 rounded shadow"
        />
        <AddUnitButton
          addUnitFunction={addPewpew}
          name="Pewpew"
          className="bg-white hover:bg-gray-100 text-gray-800 font-semibold py-1 px-2 border border-gray-400 rounded shadow"
        />
        <AddUnitButton
          addUnitFunction={addTanky}
          name="Tanky"
          className="bg-white hover:bg-gray-100 text-gray-800 font-semibold py-1 px-2 border border-gray-400 rounded shadow"
        />
      </div>
      <div>
        <AddUnitButton
          addUnitFunction={addEnemyMelee}
          name="Enemy Melee"
          className="bg-white hover:bg-gray-100 text-gray-800 font-semibold py-1 px-2 border border-gray-400 rounded shadow"
        />
        <AddUnitButton
          addUnitFunction={addEnemyPewpew}
          name="Enemy Pewpew"
          className="bg-white hover:bg-gray-100 text-gray-800 font-semibold py-1 px-2 border border-gray-400 rounded shadow"
        />
        <AddUnitButton
          addUnitFunction={addEnemyTanky}
          name="Enemy Tanky"
          className="bg-white hover:bg-gray-100 text-gray-800 font-semibold py-1 px-2 border border-gray-400 rounded shadow"
        />
      </div>
    </>
  );
}
