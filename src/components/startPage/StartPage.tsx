import React, { useState } from "react";
import { Routes, Route, Link } from "react-router-dom";
import Button from "../buttons/Button";
import ModalButton from "../buttons/ModalButton";
import MenuInput from "./MenuInput";
import MenuItem from "./MenuItem";
import MenuTitle from "./MenuTitle";
import OptionsPage from "./OptionsPage";
import PopupModal from "./PopupModal";

/* TODO: Consider using nested routes to show the start page elements while also being able to show each popup */

export default function StartPage() {
  const [onStartPage, setOnStartPage] = useState(true);

  const [startModal, setStartModal] = useState(false);
  const [townName, setTownName] = useState("");
  const defaultTownName = "Townsburg";
  const [difficulty, setDifficulty] = useState<"easy" | "normal" | "hard">(
    "normal"
  );
  const [tutorials, setTutorials] = useState(true);

  const [leaderboardModal, setLeaderboardModal] = useState(false);
  const [optionsModal, setOptionsModal] = useState(false);
  const [howToPlayModal, setHowToPlayModal] = useState(false);
  const [aboutModal, setAboutModal] = useState(false);

  const startGame = () => {
    setOnStartPage(!onStartPage);
  };

  const toggleStartModal = () => {
    setStartModal(!startModal);
  };
  const toggleLeaderboardModal = () => {
    setLeaderboardModal(!leaderboardModal);
  };
  const toggleOptionsModal = () => {
    setOptionsModal(!optionsModal);
  };
  const toggleHowToPlayModal = () => {
    setHowToPlayModal(!howToPlayModal);
  };
  const toggleAboutModal = () => {
    setAboutModal(!aboutModal);
  };

  const routerLinkStyle =
    "flex w-3/5 flex-row justify-between rounded-md bg-indigo-800 p-1 text-base text-slate-200 hover:bg-indigo-900 active:scale-95 sm:text-xl md:p-2 md:text-2xl lg:text-3xl xl:p-3 xl:text-4xl";

  return (
    <>
      <div className="flex h-screen flex-col items-center justify-center">
        <div className="m-1 grid auto-rows-min place-items-center gap-1 rounded bg-white/5 p-4 shadow-inherit">
          <MenuTitle title="Townsbattle" subtitle="The Game" />
          <MenuItem text="Start" icon="▶️" onClick={toggleStartModal} />
          <MenuItem
            text="Leaderboard"
            icon="🏆"
            onClick={toggleLeaderboardModal}
          />

          <Link className={routerLinkStyle} to="/options">
            <MenuItem text="Options" icon="🔧" />
          </Link>

          <MenuItem
            text="How to Play"
            icon="❓"
            onClick={toggleHowToPlayModal}
          />
          <MenuItem text="About" icon="⭐" onClick={toggleAboutModal} />
        </div>
      </div>

      {/* only render this if startModal === true */}
      {startModal && (
        <PopupModal icon="▶️" headerText="How to Play">
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
            <button
              className="mt-2 w-full flex-1 rounded-md bg-red-600 p-2.5 text-white outline-none ring-red-600 ring-offset-2 focus:ring-2"
              onClick={toggleStartModal}
            >
              Cancel
            </button>
            <button
              className="mt-2 w-full flex-1 rounded-md bg-blue-600 p-2.5 text-white outline-none ring-blue-600 ring-offset-2 focus:ring-2"
              onClick={startGame}
            >
              Next
            </button>
          </div>
        </PopupModal>
      )}

      {leaderboardModal && (
        <PopupModal headerText="Leaderboard" icon="🏆">
          <p className="mt-2 leading-relaxed text-gray-500">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Fugit vel
            suscipit fuga impedit explicabo, consequuntur at corrupti, est,
            culpa nostrum recusandae debitis distinctio odio repellendus
            voluptatum asperiores harum facilis mollitia.
          </p>

          <div className="mt-3 items-center gap-2 sm:flex">
            <button
              className="mt-2 w-full flex-1 rounded-md bg-green-600 p-2.5 text-white outline-none ring-green-600 ring-offset-2 focus:ring-2"
              onClick={toggleLeaderboardModal}
            >
              Close
            </button>
          </div>
        </PopupModal>
      )}

      {/* TODO: Continue from here -- was working on getting this routing working properly */}
      <Routes>
        <Route
          path="options"
          element={<OptionsPage toggleOptionsModal={toggleOptionsModal} />}
        />
      </Routes>

      {/* {optionsModal && <OptionsPage toggleOptionsModal={toggleOptionsModal} />} */}

      {howToPlayModal && (
        <PopupModal headerText="How To Play" icon="❓">
          <p className="mt-2 leading-relaxed text-gray-500">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Fugit vel
            suscipit fuga impedit explicabo, consequuntur at corrupti, est,
            culpa nostrum recusandae debitis distinctio odio repellendus
            voluptatum asperiores harum facilis mollitia.
          </p>

          <div className="mt-3 items-center gap-2 sm:flex">
            <button
              className="mt-2 w-full flex-1 rounded-md bg-green-600 p-2.5 text-white outline-none ring-green-600 ring-offset-2 focus:ring-2"
              onClick={toggleHowToPlayModal}
            >
              Close
            </button>
          </div>
        </PopupModal>
      )}

      {aboutModal && (
        <PopupModal headerText="About" icon="⭐">
          <p className="mt-2 leading-relaxed text-gray-500">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Fugit vel
            suscipit fuga impedit explicabo, consequuntur at corrupti, est,
            culpa nostrum recusandae debitis distinctio odio repellendus
            voluptatum asperiores harum facilis mollitia.
          </p>

          <div className="mt-3 items-center gap-2 sm:flex">
            <button
              className="mt-2 w-full flex-1 rounded-md bg-green-600 p-2.5 text-white outline-none ring-green-600 ring-offset-2 focus:ring-2"
              onClick={toggleAboutModal}
            >
              Close
            </button>
          </div>
        </PopupModal>
      )}

      <Button buttonColor="red" onClick={startGame}>
        Planning/Combat
      </Button>
    </>
  );
}
