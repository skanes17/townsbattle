import { defaultGameSave } from "../gameData";
import { GameSave } from "../types";

export function newGameLoader() {
  return defaultGameSave;
}

export function gameSavesLoader() {
  const savesArray: GameSave[] = JSON.parse(
    localStorage.getItem("gameSaves") ?? "[]"
  );

  return savesArray;
}

export function returnIndexOfExistingSaveDataForCurrentGame(
  savesArray: GameSave[],
  gameId?: string
) {
  const indexOfExistingSaveDataForCurrentGame = savesArray.findIndex(
    (save) => save.gameId === gameId
  );
  return indexOfExistingSaveDataForCurrentGame;
}

export function saveGameToLocalStorage(
  gameId: string,
  currentGameSave: GameSave
) {
  currentGameSave.gameId = gameId;
  currentGameSave.timestamp = new Date().toLocaleString();

  const savesArray = gameSavesLoader();

  // find index of existing save data for the current game (returns -1 if doesn't exist)
  const indexOfExistingSaveDataForCurrentGame =
    returnIndexOfExistingSaveDataForCurrentGame(savesArray, gameId);

  // if an existing save data for the current game ID exists, overwrite it with the currentGameSave data
  // otherwise add the currentGameSave data to the beginning of the savesArray
  indexOfExistingSaveDataForCurrentGame !== -1
    ? (savesArray[indexOfExistingSaveDataForCurrentGame] = currentGameSave)
    : savesArray.unshift(currentGameSave);
  // update localStorage
  localStorage.setItem("gameSaves", JSON.stringify(savesArray));
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

/* export function saveOrLoadGameUsingLocalStorage(
  functionType: FunctionType,
  gameId?: string,
  currentGameSave?: GameSave
) {
  const savesArray = gameSavesLoader();

  // find index of existing save data for the current game (returns -1 if doesn't exist)
  const indexOfExistingSaveDataForCurrentGame =
    returnIndexOfExistingSaveDataForCurrentGame(savesArray, gameId);

  if (functionType === FunctionType.Save && currentGameSave) {
    // if an existing save data for the current game ID exists, overwrite it with the currentGameSave data
    // otherwise add the currentGameSave data to the beginning of the savesArray
    indexOfExistingSaveDataForCurrentGame !== -1
      ? (savesArray[indexOfExistingSaveDataForCurrentGame] = currentGameSave)
      : savesArray.unshift(currentGameSave);
    // update localStorage
    localStorage.setItem("gameSaves", JSON.stringify(savesArray));
  }

  if (functionType === FunctionType.Load) {
    let gameToLoad = defaultGameSave;
    // if an existing save data for the current game ID exists, use that data as gameSaveToLoad
    indexOfExistingSaveDataForCurrentGame !== -1 &&
      (gameToLoad = {
        ...savesArray[indexOfExistingSaveDataForCurrentGame],
      });
    return gameToLoad;
  }
} */
