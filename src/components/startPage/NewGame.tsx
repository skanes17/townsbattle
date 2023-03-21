import React, { useEffect, useState } from "react";
import { Link, useLoaderData } from "react-router-dom";
import { defaultPlayerName, defaultTownName } from "../../gameData";
import { GameOptions, GameSave, GameState } from "../../types";
import { MenuBox, MenuBoxHeader, MenuInput } from ".";
import { v4 as uuidv4 } from "uuid";
import { FunctionType, saveOrLoadGameUsingLocalStorage } from "../../utils";

// Rename to "New Game"
export default function NewGame() {
  const newUniqueGameId = uuidv4();

  // TODO: See Notes below
  // in New Game, there's no loading a save -- it'll be all new EXCEPT options if they've been tweaked
  // Just set a default and replace the options if relevant
  // Can then set stuff to state when there's changes (already doing some of this)
  // Save all this to a save file!
  // Game will be checking whether it should make a new game or not.

  // set default settings
  const defaultGameState = useLoaderData() as GameState;
  // pull existing saved options from local storage, in case they were tweaked
  const savedOptions: GameOptions = JSON.parse(
    localStorage.getItem("savedOptions") || "{}"
  );
  // overwrite defaults with tweaked options, if relevant
  const gameState = {
    ...defaultGameState,
    ...savedOptions,
  };

  const [devTools] = useState(false);

  /* const defaultOptions: GameOptions = {
    playerName: defaultPlayerName,
    townName: defaultTownName,
    difficulty: "normal",
    tutorials: true,
  }; */

  /* const gameOptions: GameOptions = {
    ...defaultOptions,
    ...savedOptions,
  }; */

  // set those options in state
  const [currentGameState, setCurrentGameState] = useState(gameState);

  // FIXME: DO NEXT -- This wasn't fully changed yet -- Save the new settings here!
  // TODO: Likely totally replace this process with ONE save to local storage, once the Play button is clicked.
  // TODO: This should save the id and timestamp to the object and then be called within Game

  // save those options to local storage any time there's a change
  useEffect(() => {
    localStorage.setItem("savedOptions", JSON.stringify(currentGameState));
  }, [currentGameState]);

  return (
    <MenuBox icon="▶️" headerText="How to Play">
      <MenuBoxHeader>
        Collect resources, train units, construct buildings, and defeat waves of
        enemies. Survive as long as you can!
      </MenuBoxHeader>

      <MenuInput
        header={"Player Name"}
        placeholderText={currentGameState.playerName}
        // current value of the input box
        // if no name is chosen, the default gets used
        value={currentGameState.playerName}
        // what to do when input is changed
        onChange={(e) =>
          setCurrentGameState({
            ...currentGameState,
            playerName: e.target.value,
          })
        }
      />

      <MenuInput
        header={"Town Name"}
        placeholderText={currentGameState.townName}
        // current value of the input box
        // if no name is chosen, the default gets used
        value={currentGameState.townName}
        // what to do when input is changed
        onChange={(e) =>
          setCurrentGameState({
            ...currentGameState,
            townName: e.target.value,
          })
        }
      />

      {/* horizontal line */}
      <div className="mt-3 border-t border-gray-300"></div>

      {devTools && (
        <div className="bg-amber-100 capitalize text-gray-500">
          <p className="font-bold text-gray-800">Summary (DevTool)</p>
          <p>Player Name: {currentGameState.playerName}</p>
          <p>Town Name: {currentGameState.townName}</p>
          <p>Difficulty: {currentGameState.difficulty}</p>
          <p>Tutorials: {currentGameState.tutorials ? "On" : "Off"}</p>
        </div>
      )}

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
        >
          Play
        </Link>
      </div>
    </MenuBox>
  );
}
