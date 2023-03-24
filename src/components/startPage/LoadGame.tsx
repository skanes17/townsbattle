import React from "react";
import { Link, useLoaderData } from "react-router-dom";
import { MenuBoxHeader, MenuButtonContainer } from ".";
import { GameSave } from "../../types";
import MenuBox from "./MenuBox";
import { SaveFileLink } from "./SaveFileLink";
import { SaveFileLinkContainer } from "./SaveFileLinkContainer";

export default function LoadGame() {
  const savesArray = useLoaderData() as GameSave[];

  return (
    <MenuBox headerText="Load Game" icon="💾">
      <MenuBoxHeader>
        {savesArray.length === 0 &&
          "Any game you've started but haven't finished will appear below!"}
      </MenuBoxHeader>

      {savesArray.length > 0 && (
        <SaveFileLinkContainer>
          {savesArray.map((gameSave) => (
            <SaveFileLink key={gameSave.gameId} gameSave={gameSave} />
          ))}
        </SaveFileLinkContainer>
      )}
      <Link
        className="mt-2 inline-flex w-1/4 justify-center rounded-md bg-green-600 p-2.5 text-white outline-transparent ring-green-600 ring-offset-2 hover:bg-green-700 focus:ring-2"
        to="/"
      >
        Close
      </Link>
    </MenuBox>
  );
}
