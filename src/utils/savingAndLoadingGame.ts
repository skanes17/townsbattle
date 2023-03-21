import { defaultGameSave } from "../gameData";
import { GameSave } from "../types";
import { tidyDateAndTime } from "./tidyDateAndTime";

export function gameSavesLoader() {
  const savesArray: GameSave[] = JSON.parse(
    localStorage.getItem("gameSaves") ?? "[]"
  );
  return savesArray;
}

export function returnIndexOfExistingSaveDataForCurrentGame(
  savesArray: GameSave[],
  currentGameId?: string
) {
  const indexOfExistingSaveDataForCurrentGame = savesArray.findIndex(
    (savedGame) => savedGame.gameId === currentGameId
  );
  /* console.log(
    indexOfExistingSaveDataForCurrentGame !== -1
      ? `Found it!`
      : `No game found for id-${currentGameId}!`
  ); */
  return indexOfExistingSaveDataForCurrentGame;
}

export function saveGameToLocalStorage(gameId: string, gameToSave: GameSave) {
  // set a gameId if not already set
  gameToSave.gameId = gameId;
  // stamp the date on the new save file
  gameToSave.timestamp = tidyDateAndTime(new Date());

  const savesArray = gameSavesLoader();

  // find index of existing save data for the current game (returns -1 if doesn't exist)
  const indexOfExistingSaveDataForCurrentGame =
    returnIndexOfExistingSaveDataForCurrentGame(savesArray, gameId);

  // if an existing save data for the current game ID exists, overwrite it with the gameToSave data
  // otherwise add the gameToSave data to the beginning of the savesArray
  indexOfExistingSaveDataForCurrentGame !== -1
    ? (savesArray[indexOfExistingSaveDataForCurrentGame] = gameToSave)
    : savesArray.unshift(gameToSave);

  // update localStorage and return a boolean indicating whether the operation was successful
  try {
    localStorage.setItem("gameSaves", JSON.stringify(savesArray));
    return true;
  } catch (error) {
    console.error("Failed to save game to local storage: ", error);
    return false;
  }
}

export function loadDefaultOrExistingGameFromLocalStorage(gameId: string) {
  const savesArray = gameSavesLoader();

  // find index of existing save data for the current game (returns -1 if doesn't exist)
  const indexOfExistingSaveDataForCurrentGame =
    returnIndexOfExistingSaveDataForCurrentGame(savesArray, gameId);

  let gameToLoad;
  // if an existing save data for the current game ID exists, use it; else load defaults
  indexOfExistingSaveDataForCurrentGame !== -1
    ? (gameToLoad = savesArray[indexOfExistingSaveDataForCurrentGame])
    : (gameToLoad = defaultGameSave);
  return gameToLoad;
}

export function defaultSettingsLoader() {
  const defaultSettings = defaultGameSave;
  return defaultSettings;
}

// EXPERIMENT
/* @ts-ignore */
export const gameLoader = ({ params }) => {
  // comes from the URL
  const gameId: string = params.gameId;
  const savesArray = gameSavesLoader();

  // find index of existing save data for the current game (returns -1 if doesn't exist)
  const indexOfExistingSaveDataForCurrentGame =
    returnIndexOfExistingSaveDataForCurrentGame(savesArray, gameId);

  let gameToLoad;
  // if an existing save data for the current game ID exists, use it; else load defaults, add the new gameId to the object
  indexOfExistingSaveDataForCurrentGame !== -1
    ? (gameToLoad = { ...savesArray[indexOfExistingSaveDataForCurrentGame] })
    : (gameToLoad = { ...defaultGameSave, gameId: gameId });
  return gameToLoad;
};
