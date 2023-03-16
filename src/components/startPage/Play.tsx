import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { defaultPlayerName, defaultTownName } from "../../gameData";
import { GameOptions } from "../../types";
import { MenuBox, MenuInput } from "../startPage";
import { MenuBoxHeader } from "./MenuBoxHeader";

export default function Play() {
  const [devTools] = useState(false);

  const defaultOptions: GameOptions = {
    playerName: defaultPlayerName,
    townName: defaultTownName,
    difficulty: "normal",
    tutorials: true,
  };

  // pull existing saved options from local storage
  const savedOptions: GameOptions = JSON.parse(
    localStorage.getItem("savedOptions") || "{}"
  );

  const gameOptions: GameOptions = {
    ...defaultOptions,
    ...savedOptions,
  };

  // set those options in state
  const [options, setOptions] = useState(gameOptions);

  // save those options to local storage any time there's a change
  useEffect(() => {
    localStorage.setItem("savedOptions", JSON.stringify(options));
  }, [options]);

  return (
    <MenuBox icon="▶️" headerText="How to Play">
      <MenuBoxHeader>
        Collect resources, train units, construct buildings, and defeat waves of
        enemies. Survive as long as you can!
      </MenuBoxHeader>

      <MenuInput
        header={"Player Name"}
        placeholderText={options.playerName}
        // current value of the input box
        // if no name is chosen, the default gets used
        value={options.playerName}
        // what to do when input is changed
        onChange={(e) =>
          setOptions({
            ...options,
            playerName: e.target.value,
          })
        }
      />

      <MenuInput
        header={"Player Name"}
        placeholderText={options.townName}
        // current value of the input box
        // if no name is chosen, the default gets used
        value={options.townName}
        // what to do when input is changed
        onChange={(e) =>
          setOptions({
            ...options,
            townName: e.target.value,
          })
        }
      />

      {/* FIXME: Wrap all in a form; add type="button" to buttons that won't submit data, type="submit" otherwise */}
      <div>
        <div className="mt-6 text-lg font-medium text-white">Difficulty</div>
        <div className="mt-3 items-center gap-2 sm:flex">
          {difficulty === "easy" ? (
            <MenuButton
              buttonText="Easy"
              buttonColor="green"
              isSelected={true}
            />
          ) : (
            <MenuButton
              buttonText="Easy"
              buttonColor="green"
              isSelected={false}
              onClick={() => difficultyUpdater("easy")}
            />
          )}
          {difficulty === "normal" ? (
            <MenuButton
              buttonText="Normal"
              buttonColor="blue"
              isSelected={true}
            />
          ) : (
            <MenuButton
              buttonText="Normal"
              buttonColor="blue"
              isSelected={false}
              onClick={() => difficultyUpdater("normal")}
            />
          )}
          {difficulty === "hard" ? (
            <MenuButton buttonText="Hard" buttonColor="red" isSelected={true} />
          ) : (
            <MenuButton
              buttonText="Hard"
              buttonColor="red"
              isSelected={false}
              onClick={() => difficultyUpdater("hard")}
            />
          )}
          {difficulty === "nightmare" ? (
            <MenuButton
              buttonText="Nightmare"
              buttonColor="deepRed"
              isSelected={true}
            />
          ) : (
            <MenuButton
              buttonText="Nightmare"
              buttonColor="deepRed"
              isSelected={false}
              onClick={() => difficultyUpdater("nightmare")}
            />
          )}
        </div>
      </div>

      <div>
        <div className="mt-6 text-lg font-medium text-white">Tutorials</div>
        <div className="mt-3 items-center gap-2 sm:flex">
          {tutorials === true ? (
            <>
              <MenuButton
                buttonText="Off"
                buttonColor="blue"
                isSelected={false}
                onClick={() => tutorialsUpdater(false)}
              />
              <MenuButton
                buttonText="On"
                buttonColor="blue"
                isSelected={true}
              />
            </>
          ) : (
            <>
              <MenuButton
                buttonText="Off"
                buttonColor="blue"
                isSelected={true}
              />
              <MenuButton
                buttonText="On"
                buttonColor="blue"
                isSelected={false}
                onClick={() => tutorialsUpdater(true)}
              />
            </>
          )}
        </div>
      </div>

      {/* horizontal line */}
      <div className="mt-3 border-t border-gray-300"></div>

      {devTools && (
        <div className="bg-amber-100 capitalize text-gray-500">
          <p className="font-bold text-gray-800">Summary (DevTool)</p>
          <p>Player Name: {options.playerName}</p>
          <p>Town Name: {options.townName}</p>
          <p>Difficulty: {options.difficulty}</p>
          <p>Tutorials: {options.tutorials ? "On" : "Off"}</p>
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
          to="/play/game"
          className="mt-2 w-full flex-1 rounded-md bg-blue-600 p-2.5 text-center font-semibold text-white outline-transparent ring-blue-600 ring-offset-2 focus:ring-2"
          state={startData}
          onClick={() => storeStartData()}
        >
          Next
        </Link>
      </div>
    </MenuBox>
  );
}
