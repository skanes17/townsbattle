// THIS IS TOTALLY UNFINISHED

// @ts-nocheck
import React from "react";

export default function AddUnitButton({
  myUnits,
  setMyUnits,
  type,
  name,
  attack,
  defense,
  id,
}) {
  // TRY TO USE THIS REFERENCE TO HAVE THIS COMPONENT SELF-CONTAINED
  /* const [newMelee, setNewMelee] = useState({
    type: "melee",
    name: "Melee",
    attack: 5,
    defense: 5,
  }); */

  // @ts-ignore
  const addMelee = () => {
    // copy the current newMelee stats
    // TODO: Check if this is always using the most current state
    const newMeleeCopy = { ...newMelee, id: unitId };

    setMyUnits((myUnits) => {
      return [...myUnits, newMeleeCopy];
    });

    console.log(myUnits);
    setUnitId(unitId + 1);
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
