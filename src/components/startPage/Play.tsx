import React from "react";
import { Link } from "react-router-dom";
import { Difficulty } from "../../types";
import ModalButton from "../buttons/ModalButton";
import MenuInput from "./MenuInput";
import MenuBox from "./MenuBox";

interface PlayProps {
  townName: string;
  setTownName: any;
  defaultTownName: string;
  difficulty: Difficulty;
  setDifficulty: any;
  tutorials: boolean;
  setTutorials: any;
}

export default function Play({
  townName,
  setTownName,
  defaultTownName,
  difficulty,
  setDifficulty,
  tutorials,
  setTutorials,
}: PlayProps) {
  return (
    <MenuBox icon="▶️" headerText="How to Play">
      {/* FIXME: Figure out how to get this into component */}
      <p className="mt-2 leading-relaxed text-gray-500">
        Collect resources, train and upgrade an army, and defeat waves of
        enemies. Survive as long as you can!
      </p>

      <MenuInput
        placeholderText="Townsburg"
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
            <ModalButton
              buttonText="Easy"
              buttonColor="green"
              isSelected={true}
            />
          ) : (
            <ModalButton
              buttonText="Easy"
              buttonColor="green"
              isSelected={false}
              onClick={() => setDifficulty("easy")}
            />
          )}
          {difficulty === "normal" ? (
            <ModalButton
              buttonText="Normal"
              buttonColor="blue"
              isSelected={true}
            />
          ) : (
            <ModalButton
              buttonText="Normal"
              buttonColor="blue"
              isSelected={false}
              onClick={() => setDifficulty("normal")}
            />
          )}
          {difficulty === "hard" ? (
            <ModalButton
              buttonText="Hard"
              buttonColor="red"
              isSelected={true}
            />
          ) : (
            <ModalButton
              buttonText="Hard"
              buttonColor="red"
              isSelected={false}
              onClick={() => setDifficulty("hard")}
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
              <ModalButton
                buttonText="Off"
                buttonColor="blue"
                isSelected={false}
                onClick={() => setTutorials(false)}
              />
              <ModalButton
                buttonText="On"
                buttonColor="blue"
                isSelected={true}
              />
            </>
          ) : (
            <>
              <ModalButton
                buttonText="Off"
                buttonColor="blue"
                isSelected={true}
              />
              <ModalButton
                buttonText="On"
                buttonColor="blue"
                isSelected={false}
                onClick={() => setTutorials(true)}
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
          /* onClick={toggleStartModal} */
        >
          Cancel
        </Link>
        <Link
          /* FIXME: game page not overhauled yet */
          to="/game"
          className="mt-2 w-full flex-1 rounded-md bg-blue-600 p-2.5 text-center text-white outline-none ring-blue-600 ring-offset-2 focus:ring-2"
          /* onClick={startGame} */
        >
          Next
        </Link>
      </div>
    </MenuBox>
  );
}
