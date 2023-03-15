import React, { useState } from "react";
import { Link } from "react-router-dom";
import { defaultPlayerName, playerNames } from "../../gameData/playerNames";
import { defaultTownName, townNames } from "../../gameData/townNames";
import { Difficulty, DifficultyUpdater, TutorialsUpdater } from "../../types";
import { MenuButton } from "../buttons";
import { MenuBox, MenuInput } from "../startPage";
import { MenuButtonContainer } from "./MenuButtonContainer";

interface StartData {
  playerName: string | undefined;
  defaultPlayerName: string;
  townName: string | undefined;
  defaultTownName: string;
  difficulty: Difficulty;
  tutorials: boolean;
}

export default function Play() {
  const [devTools, setDevTools] = useState(false);

  const defaultSettings = {
    playerName: defaultPlayerName,
    townName: defaultTownName,
    difficulty: "normal",
    tutorials: true,
  };

  // Calling from localStorage -- if none found (null) set it to default
  // ==Names== //
  const [playerName, setPlayerName] = useState(
    JSON.parse(localStorage.getItem("playerName") as string) ??
      defaultSettings.playerName
  );
  localStorage.setItem("playerName", JSON.stringify(playerName));

  const [townName, setTownName] = useState(
    JSON.parse(localStorage.getItem("townName") as string) ??
      defaultSettings.townName
  );
  localStorage.setItem("townName", JSON.stringify(townName));

  // ==Difficulty== //
  const [difficulty, setDifficulty] = useState<Difficulty>(
    JSON.parse(localStorage.getItem("difficulty") as string) ??
      defaultSettings.difficulty
  );
  localStorage.setItem("difficulty", JSON.stringify(difficulty));

  // ==Tutorials== //
  const [tutorials, setTutorials] = useState(
    JSON.parse(localStorage.getItem("tutorials") as string) ??
      defaultSettings.tutorials
  );
  localStorage.setItem("tutorials", JSON.stringify(tutorials));

  return (
    <MenuBox icon="▶️" headerText="How to Play">
      {/* FIXME: Figure out how to get this into component */}
      <p className="mt-2 leading-relaxed text-white">
        Collect resources, train and upgrade an army, and defeat waves of
        enemies. Survive as long as you can!
      </p>

      <MenuInput
        header={"Player Name"}
        placeholderText={playerName}
        // current value of the input box
        // if no name is chosen, the default gets used
        value={playerName}
        // what to do when input is changed
        onChange={(e) => setPlayerName(e.target.value)}
      />

      <MenuInput
        header={"Name Your Town"}
        placeholderText={townName}
        // current value of the input box
        // if no name is chosen, the default gets used
        value={townName}
        // what to do when input is changed
        onChange={(e) => setTownName(e.target.value)}
      />

      {devTools && (
        <div className="bg-amber-100 capitalize text-gray-500">
          <p className="font-bold text-gray-800">Summary (DevTool)</p>
          <p>Player Name: {playerName}</p>
          <p>Town Name: {townName}</p>
          <p>Difficulty: {difficulty}</p>
          <p>Tutorials: {tutorials ? "On" : "Off"}</p>
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
