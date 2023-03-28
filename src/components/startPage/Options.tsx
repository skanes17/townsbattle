import { useState } from "react";
import { Link } from "react-router-dom";
import { defaultPlayerName, defaultTownName } from "../../gameData";
import { GameOptions } from "../../types";
import { MenuButton, WarningButton } from "../buttons";
import { MenuBox, MenuBoxHeader, MenuButtonContainer } from "../startPage";

export default function Options() {
  const defaultOptions: GameOptions = {
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

  return (
    <MenuBox icon="⚙️" headerText="Options">
      <MenuBoxHeader>
        Tutorials give you in-game tips on game mechanics. Difficulty increases
        the strength and number of enemies, but also greatly increases your
        score!
      </MenuBoxHeader>

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

      <MenuButtonContainer headerText="Data Management">
        <WarningButton />
      </MenuButtonContainer>

      {/* horizontal line */}
      <div className="my-3 border-t border-gray-300"></div>

      <div className="mt-3 items-center gap-2 sm:flex">
        <Link
          to="/"
          className="mt-2 w-full flex-1 rounded-md bg-red-600 p-2.5 text-center font-semibold text-white outline-transparent ring-red-600 ring-offset-2 hover:bg-red-700 focus:ring-2"
        >
          Cancel
        </Link>
        <Link
          to="/"
          className="mt-2 w-full flex-1 rounded-md bg-green-600 p-2.5 text-center font-semibold text-white outline-transparent ring-green-600 ring-offset-2 hover:bg-green-700 focus:ring-2"
          onClick={() =>
            localStorage.setItem("savedOptions", JSON.stringify(options))
          }
        >
          Save
        </Link>
      </div>
    </MenuBox>
  );
}
