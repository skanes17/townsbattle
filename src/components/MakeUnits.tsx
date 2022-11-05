// @ts-nocheck
import React from "react";

export default function MakeUnits(myUnits, setMyUnits) {
  // @ts-ignore
  const addMelee = () => {
    setMyUnits((myUnits) => {
      // Object.assign would also work
      return [...myUnits, newMelee];
    });
    console.log(myUnits);
  };

  // @ts-ignore
  const addPewpew = () => {
    setMyUnits((myUnits) => {
      // Object.assign would also work
      return [...myUnits, newPewpew];
    });
    console.log(myUnits);
  };

  // @ts-ignore
  const addTanky = () => {
    setMyUnits((myUnits) => {
      // Object.assign would also work
      return [...myUnits, newTanky];
    });
    console.log(myUnits);
  };

  return (
    <div>
      <br></br>
      <button
        onClick={addMelee}
        className="bg-white hover:bg-gray-100 text-gray-800 font-semibold py-1 px-2 border border-gray-400 rounded shadow"
      >
        Train Melee
      </button>
      <button
        onClick={addPewpew}
        className="bg-white hover:bg-gray-100 text-gray-800 font-semibold py-1 px-2 border border-gray-400 rounded shadow"
      >
        Train Pewpew
      </button>
      <button
        onClick={addTanky}
        className="bg-white hover:bg-gray-100 text-gray-800 font-semibold py-1 px-2 border border-gray-400 rounded shadow"
      >
        Train Tanky
      </button>
    </div>
  );
}
