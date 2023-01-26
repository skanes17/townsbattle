import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Difficulty, DifficultyUpdater, TutorialsUpdater } from "../../types";
import { MenuButton } from "../buttons";
import { MenuBox, MenuInput } from "../startPage";

interface StartData {
  townName: string;
  defaultTownName: string;
  difficulty: Difficulty;
  tutorials: boolean;
}

export const defaultTownName = "Townsburg";

export default function Play() {
  const [townName, setTownName] = useState("");
  const [difficulty, setDifficulty] = useState<Difficulty>("normal");
  const [tutorials, setTutorials] = useState(true);

  const difficultyUpdater: DifficultyUpdater = (difficulty) => {
    setDifficulty(difficulty);
  };
  const tutorialsUpdater: TutorialsUpdater = (tutorials) => {
    setTutorials(tutorials);
  };

  // exports data to local storage
  const storeStartData = () => {
    localStorage.setItem("townName", townName);
    localStorage.setItem("difficulty", difficulty);
    // use JSON.parse to convert back to Boolean when imported
    localStorage.setItem("tutorials", tutorials.toString());
  };

  return (
    <MenuBox icon="▶️" headerText="How to Play">
      {/* FIXME: Figure out how to get this into component */}
      <p className="mt-2 leading-relaxed text-gray-500">
        Collect resources, train and upgrade an army, and defeat waves of
        enemies. Survive as long as you can!
      </p>

      <MenuInput
        placeholderText={defaultTownName}
        // current value of the input box
        // if no name is chosen, a default gets used using {townName || "Townsburg"}
        value={townName}
        // what to do when input is changed
        onChange={(e) => setTownName(e.target.value)}
      />

      {/* FIXME: Wrap all in a form; add type="button" to buttons that won't submit data, type="submit" otherwise */}
      <div>
        <div className="mt-6 text-lg font-medium text-gray-900 dark:text-white">
          Difficulty
        </div>
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
        </div>
      </div>

      <div>
        <div className="mt-6 text-lg font-medium text-gray-900 dark:text-white">
          Tutorials
        </div>
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

      <div className="bg-amber-100 capitalize text-gray-500">
        <p className="font-bold text-gray-800">Summary (DevTool)</p>
        <p>Town Name: {townName || defaultTownName}</p>
        <p>Difficulty: {difficulty}</p>
        <p>Tutorials: {tutorials ? "On" : "Off"}</p>
      </div>

      <div className="mt-3 items-center gap-2 sm:flex">
        <Link
          to="/"
          className="mt-2 w-full flex-1 rounded-md bg-red-600 p-2.5 text-center text-white outline-none ring-red-600 ring-offset-2 focus:ring-2"
        >
          Cancel
        </Link>
        <Link
          to="/play/game"
          className="mt-2 w-full flex-1 rounded-md bg-blue-600 p-2.5 text-center text-white outline-none ring-blue-600 ring-offset-2 focus:ring-2"
          /* FIXME: Need to send state data to Game */
          onClick={() => storeStartData()}
        >
          Next
        </Link>
      </div>
    </MenuBox>
  );
}
