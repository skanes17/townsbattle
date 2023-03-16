import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { defaultPlayerName, defaultTownName } from "../../gameData";
import { GameOptions } from "../../types";
import { MenuButton } from "../buttons";
import { MenuBox, MenuButtonContainer } from "../startPage";
import { MenuBoxHeader } from "./MenuBoxHeader";

export default function Options() {
  const [counter, setCounter] = useState(0);
  const incrementPopupCounter = () => {
    setCounter((prev) => prev + 1);
  };

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

  const [options, setOptions] = useState(gameOptions);

  // update local storage when the buttons are clicked
  useEffect(() => {
    localStorage.setItem("savedOptions", JSON.stringify(options));
  }, [options]);

  return (
    <MenuBox icon="▶️" headerText="Options">
      <MenuBoxHeader>
        Tutorials give you in-game tips on game mechanics. Difficulty increases
        the strength and number of enemies, but also greatly increases your
        score!
      </MenuBoxHeader>

      <MenuButtonContainer headerText="Difficulty">
        {options.difficulty === "easy" ? (
          <MenuButton buttonText="Easy" buttonColor="green" isSelected={true} />
        ) : (
          <MenuButton
            buttonText="Easy"
            buttonColor="green"
            isSelected={false}
            onClick={() =>
              setOptions({
                ...options,
                difficulty: "easy",
              })
            }
          />
        )}
        {options.difficulty === "normal" ? (
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
            onClick={() =>
              setOptions({
                ...options,
                difficulty: "normal",
              })
            }
          />
        )}
        {options.difficulty === "hard" ? (
          <MenuButton buttonText="Hard" buttonColor="red" isSelected={true} />
        ) : (
          <MenuButton
            buttonText="Hard"
            buttonColor="red"
            isSelected={false}
            onClick={() =>
              setOptions({
                ...options,
                difficulty: "hard",
              })
            }
          />
        )}
        {options.difficulty === "nightmare" ? (
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
            onClick={() =>
              setOptions({
                ...options,
                difficulty: "nightmare",
              })
            }
          />
        )}
      </MenuButtonContainer>

      <MenuButtonContainer headerText="Tutorials">
        {options.tutorials === true ? (
          <>
            <MenuButton
              buttonText="Off"
              buttonColor="blue"
              isSelected={false}
              onClick={() =>
                setOptions({
                  ...options,
                  tutorials: false,
                })
              }
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
              onClick={() =>
                setOptions({
                  ...options,
                  tutorials: true,
                })
              }
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
