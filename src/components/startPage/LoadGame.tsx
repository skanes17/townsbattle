import React from "react";
import { Link, useLoaderData } from "react-router-dom";
import { MenuBoxHeader, MenuButtonContainer } from ".";
import { GameSave } from "../../types";
import MenuBox from "./MenuBox";

export default function LoadGame() {
  // saves should be available from the loader
  const savesArray = useLoaderData() as GameSave[];

  return (
    <MenuBox headerText="Load Game" icon="💾">
      <MenuBoxHeader>
        Any game you've started but haven't finished will appear below!
      </MenuBoxHeader>

      {/* // TODO: Add delete save button to each save */}
      {savesArray.length > 0 && (
        <MenuButtonContainer headerText="Saved Games">
          <div className="mt-3 items-center gap-2 sm:flex">
            {savesArray.map((save, index) => (
              <Link
                className="mt-2 w-full flex-1 rounded-md bg-orange-600 p-2.5 text-white outline-transparent ring-green-600 ring-offset-2 focus:ring-2"
                to={`/${save.gameId}`}
              >
                <div className="grid auto-rows-auto">
                  <p>Player: {save.playerName}</p>
                  <p>Town: {save.townName}</p>
                  <p>Score: {save.score}</p>
                  <p>{save.timestamp}</p>
                </div>
              </Link>
            ))}
          </div>
        </MenuButtonContainer>
      )}
      <Link
        className="mt-2 inline-flex w-1/4 justify-center rounded-md bg-green-600 p-2.5 text-white outline-transparent ring-green-600 ring-offset-2 focus:ring-2"
        to="/"
        /* onClick={toggleLeaderboardModal} */
      >
        Close
      </Link>
    </MenuBox>
  );
}
