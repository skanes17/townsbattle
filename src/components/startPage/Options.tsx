import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { playerNames } from "../../gameData/playerNames";
import { townNames } from "../../gameData/townNames";
import { Difficulty, DifficultyUpdater, TutorialsUpdater } from "../../types";
import { MenuButton } from "../buttons";
import WarningButton from "../buttons/WarningButton";
import { MenuBox, MenuInput } from "../startPage";
import { MenuButtonContainer } from "./MenuButtonContainer";

export default function Options() {
  const [devTools, setDevTools] = useState(false);
  const [showWarning, setShowWarning] = useState(false);

  const [counter, setCounter] = useState(0);
  const incrementPopupCounter = () => {
    setCounter((prev) => prev + 1);
  };

  const [difficulty, setDifficulty] = useState<Difficulty>("normal");
  const [tutorials, setTutorials] = useState(true);

  // update local storage when the buttons are clicked
  useEffect(() => {
    localStorage.setItem("difficulty", JSON.stringify(difficulty));
  }, [difficulty]);
  useEffect(() => {
    localStorage.setItem("tutorials", JSON.stringify(tutorials));
  }, [tutorials]);

  return (
    <MenuBox icon="▶️" headerText="Options">
      {/* FIXME: Figure out how to get this into component */}
      <p className="mt-2 leading-relaxed text-white">
        Tutorials give you in-game tips on game mechanics. Difficulty increases
        the strength and number of enemies, but also greatly increases your
        score!
      </p>

      <MenuButtonContainer headerText="Difficulty">
        {difficulty === "easy" ? (
          <MenuButton buttonText="Easy" buttonColor="green" isSelected={true} />
        ) : (
          <MenuButton
            buttonText="Easy"
            buttonColor="green"
            isSelected={false}
            onClick={() => setDifficulty("easy")}
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
            onClick={() => setDifficulty("normal")}
          />
        )}
        {difficulty === "hard" ? (
          <MenuButton buttonText="Hard" buttonColor="red" isSelected={true} />
        ) : (
          <MenuButton
            buttonText="Hard"
            buttonColor="red"
            isSelected={false}
            onClick={() => setDifficulty("hard")}
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
            onClick={() => setDifficulty("nightmare")}
          />
        )}
      </MenuButtonContainer>

      <MenuButtonContainer headerText="Tutorials">
        {tutorials === true ? (
          <>
            <MenuButton
              buttonText="Off"
              buttonColor="blue"
              isSelected={false}
              onClick={() => setTutorials(false)}
            />
            <MenuButton buttonText="On" buttonColor="blue" isSelected={true} />
          </>
        ) : (
          <>
            <MenuButton buttonText="Off" buttonColor="blue" isSelected={true} />
            <MenuButton
              buttonText="On"
              buttonColor="blue"
              isSelected={false}
              onClick={() => setTutorials(true)}
            />
          </>
        )}
      </MenuButtonContainer>

      <MenuButtonContainer headerText="Delete All Saved Data">
        <WarningButton
          counter={counter}
          setCounter={setCounter}
          incrementPopupCounter={incrementPopupCounter}
        />
      </MenuButtonContainer>

      {/* horizontal line */}
      <div className="my-3 border-t border-gray-300"></div>

      <div className="flex items-center gap-2 p-4">
        <Link
          to="/"
          className="mt-2 inline-flex grow items-center justify-center rounded-md bg-red-600 p-2.5 text-center font-semibold text-white outline-transparent ring-red-600 ring-offset-2 hover:bg-red-500 focus:ring-2"
        >
          Close
        </Link>
      </div>
    </MenuBox>
  );
}
