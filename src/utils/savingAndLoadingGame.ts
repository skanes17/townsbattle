import { defaultGameState } from "../gameData/defaultGameState";
import { GameSave } from "../types";

export const newGameLoader = () => {
  return defaultGameState;
};

export enum FunctionType {
  Save,
  Load,
}

export function saveOrLoadGameUsingLocalStorage(
  functionType: FunctionType,
  gameId?: string,
  currentGameSave?: GameSave
) {
  const savesArray = gameLoader();
  // find index of existing save data for the current game (returns -1 if doesn't exist)
  const indexOfExistingSaveDataForCurrentGame =
    returnIndexOfExistingSaveDataForCurrentGame(savesArray, gameId);

  if (functionType === FunctionType.Save && currentGameSave) {
    // if an existing save data for the current game ID exists, overwrite it with the currentGameSave data
    // otherwise add the currentGameSave data to the beginning of the savesArray
    indexOfExistingSaveDataForCurrentGame !== -1
      ? (savesArray[indexOfExistingSaveDataForCurrentGame] = currentGameSave)
      : savesArray.unshift(currentGameSave);
    localStorage.setItem("gameSaves", JSON.stringify(savesArray));
  } else if (functionType === FunctionType.Load) {
    // if an existing save data for the current game ID exists, use that data as currentGameSave
    // otherwise use defaultGameState
    indexOfExistingSaveDataForCurrentGame !== -1
      ? (currentGameSave = savesArray[indexOfExistingSaveDataForCurrentGame])
      : (currentGameSave = defaultGameState);
    return currentGameSave;
  }
}

export const gameLoader = () => {
  const savesArray: GameSave[] = JSON.parse(
    localStorage.getItem("gameSaves") ?? "[]"
  );
  return savesArray;
};

export const defaultSettingsLoader = () => {
  const defaultSettings = defaultGameState;
  return defaultSettings;
};

export const returnIndexOfExistingSaveDataForCurrentGame = (
  savesArray: GameSave[],
  gameId?: string
) => {
  const indexOfExistingSaveDataForCurrentGame = savesArray.findIndex(
    (save) => save.gameId === gameId
  );
  return indexOfExistingSaveDataForCurrentGame;
};
