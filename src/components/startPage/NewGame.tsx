import React, { useEffect, useState } from "react";
import { Link, useLoaderData } from "react-router-dom";
import { GameOptions, GameSave } from "../../types";
import { MenuBox, MenuBoxHeader, MenuInput } from ".";
import { v4 as uuidv4 } from "uuid";
import { saveGameToLocalStorage } from "../../utils";

// Rename to "New Game"
export default function NewGame() {
  const [devTools] = useState(false);

  // set default settings
  const defaultGameSave = useLoaderData() as GameSave;

  const newUniqueGameId = uuidv4();

  // TODO: See Notes below
  // in New Game, there's no loading a save -- it'll be all new EXCEPT options if they've been tweaked
  // Just set a default and replace the options if relevant
  // Can then set stuff to state when there's changes (already doing some of this)
  // Save all this to a save file!
  // Game will be checking whether it should make a new game or not.

  // pull existing saved options from local storage, in case they were tweaked
  const savedOptions: GameOptions = JSON.parse(
    localStorage.getItem("savedOptions") || "{}"
  );

  // overwrite defaults with tweaked options, if relevant
  const gameState = {
    ...defaultGameSave,
    ...savedOptions,
  };

  // set those options in state
  const [currentGameSave, setCurrentGameSave] = useState(gameState);

  return (
    <MenuBox icon="▶️" headerText="How to Play">
      <MenuBoxHeader>
        Collect resources, train units, construct buildings, and defeat waves of
        enemies. Survive as long as you can!
      </MenuBoxHeader>

      <MenuInput
        header={"Player Name"}
        placeholderText={currentGameSave.playerName}
        // current value of the input box
        // if no name is chosen, the default gets used
        value={currentGameSave.playerName}
        // what to do when input is changed
        onChange={(e) =>
          setCurrentGameSave({
            ...currentGameSave,
            playerName: e.target.value,
          })
        }
      />

      <MenuInput
        header={"Town Name"}
        placeholderText={currentGameSave.townName}
        // current value of the input box
        // if no name is chosen, the default gets used
        value={currentGameSave.townName}
        // what to do when input is changed
        onChange={(e) =>
          setCurrentGameSave({
            ...currentGameSave,
            townName: e.target.value,
          })
        }
      />

      {/* horizontal line */}
      <div className="mt-3 border-t border-gray-300"></div>

      <div className="mt-3 items-center gap-2 sm:flex">
        <Link
          to="/"
          className="mt-2 w-full flex-1 rounded-md bg-red-600 p-2.5 text-center font-semibold text-white outline-transparent ring-red-600 ring-offset-2 focus:ring-2"
        >
          Cancel
        </Link>
        <Link
          to={`/:${newUniqueGameId}`}
          className="mt-2 w-full flex-1 rounded-md bg-blue-600 p-2.5 text-center font-semibold text-white outline-transparent ring-blue-600 ring-offset-2 focus:ring-2"
          onClick={() =>
            saveGameToLocalStorage(newUniqueGameId, currentGameSave)
          }
        >
          Play
        </Link>
      </div>
    </MenuBox>
  );
}
