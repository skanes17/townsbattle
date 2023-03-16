import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { defaultPlayerName, defaultTownName } from "../../gameData";
import { GameOptions } from "../../types";
import { MenuBox, MenuInput } from "../startPage";

export default function Play() {
  const [devTools, setDevTools] = useState(false);

  const defaultOptions: GameOptions = {
    playerName: defaultPlayerName,
    townName: defaultTownName,
    difficulty: "normal",
    tutorials: true,
  };

  // pull existing saved options from local storage
  // || "{}" used to avoid returning null -- JSON.parse() can't parse null
  const savedOptions: GameOptions = JSON.parse(
    localStorage.getItem("savedOptions") || "{}"
  );

  // set this session's options, rewriting defaults where relevant
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
      {/* FIXME: Figure out how to get this into component */}
      <p className="mt-2 leading-relaxed text-white">
        Collect resources, train and upgrade an army, and defeat waves of
        enemies. Survive as long as you can!
      </p>

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

      {devTools && (
        <div className="bg-amber-100 capitalize text-gray-500">
          <p className="font-bold text-gray-800">Summary (DevTool)</p>
          <p>Player Name: {options.playerName}</p>
          <p>Town Name: {options.townName}</p>
          <p>Difficulty: {options.difficulty}</p>
          <p>Tutorials: {options.tutorials ? "On" : "Off"}</p>
        </div>
      )}

      {/* horizontal line */}
      <div className="my-3 border-t border-gray-300"></div>

      <div className="flex items-center gap-2 p-4">
        <Link
          to="/"
          className="mt-2 inline-flex grow items-center justify-center rounded-md bg-red-600 p-2.5 text-center font-semibold text-white outline-transparent ring-red-600 ring-offset-2 hover:bg-red-500 focus:ring-2"
        >
          Cancel
        </Link>
        <Link
          to="/play/game"
          className="mt-2 inline-flex grow items-center justify-center rounded-md bg-green-700 p-2.5 text-center font-semibold text-white outline-transparent ring-green-600 ring-offset-2 hover:bg-green-600 focus:ring-2"
        >
          Start Game
        </Link>
      </div>
    </MenuBox>
  );
}
