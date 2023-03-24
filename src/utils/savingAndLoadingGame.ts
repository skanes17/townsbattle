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
  // returns -1 if not found
  return indexOfExistingSaveDataForCurrentGame;
}

export function stringifyGameAndSaveToLocalStorage(
  gameSave: GameSave[],
  key: "gameSaves" | "leaderboard"
) {
  localStorage.setItem(key, JSON.stringify(gameSave));
}

export function saveGameToLocalStorage(gameId: string, gameToSave: GameSave) {
  // set a gameId if not already set
  gameToSave.gameId = gameId;
  // stamp the date on the new save file
  gameToSave.timestamp = tidyDateAndTime(new Date());

  const savesArray = gameSavesLoader();
  const indexOfExistingSaveDataForCurrentGame =
    returnIndexOfExistingSaveDataForCurrentGame(savesArray, gameId);

  // if an existing save data for the current game ID exists, overwrite it with the gameToSave data
  // otherwise add the gameToSave data to the beginning of the savesArray
  indexOfExistingSaveDataForCurrentGame !== -1
    ? (savesArray[indexOfExistingSaveDataForCurrentGame] = gameToSave)
    : savesArray.unshift(gameToSave);

  stringifyGameAndSaveToLocalStorage(savesArray, "gameSaves");
}

export function loadDefaultOrExistingGameFromLocalStorage(gameId: string) {
  const savesArray = gameSavesLoader();
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

export function getLeaderboardData() {
  const leaderboard: GameSave[] = JSON.parse(
    localStorage.getItem("leaderboard") ?? "[]"
  );
  return leaderboard;
}

export function deleteThisSaveAndUpdateLocalStorage(currentGameSave: GameSave) {
  const savesArray = gameSavesLoader();
  const indexOfExistingSaveDataForCurrentGame =
    returnIndexOfExistingSaveDataForCurrentGame(
      savesArray,
      currentGameSave.gameId
    );

  // remove the save from the array then update local storage
  savesArray.splice(indexOfExistingSaveDataForCurrentGame, 1);
  stringifyGameAndSaveToLocalStorage(savesArray, "gameSaves");
}

export function addResultToLeaderBoardAndDeleteSave(currentGameSave: GameSave) {
  const leaderboard = getLeaderboardData();

  leaderboard.push(currentGameSave);
  stringifyGameAndSaveToLocalStorage(leaderboard, "leaderboard");

  deleteThisSaveAndUpdateLocalStorage(currentGameSave);
}
