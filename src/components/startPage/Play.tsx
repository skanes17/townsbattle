import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { defaultPlayerName, defaultTownName } from "../../gameData";
import { GameOptions } from "../../types";
import { MenuBox, MenuBoxHeader, MenuInput } from "../startPage";

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
        >
          Next
        </Link>
      </div>
    </MenuBox>
  );
}
