import { GameSave } from "../../types";

interface SaveFileDataProps {
  gameSave: GameSave;
}

export function SaveFileData({ gameSave }: SaveFileDataProps) {
  return (
    <div className="grid auto-rows-auto items-center text-left sm:grid-cols-[5fr_2fr]">
      <div>
        <p>{gameSave.playerName}</p>
        <p>Town of {gameSave.townName}</p>
      </div>
      <div>
        <p>Score: {gameSave.score}</p>
        <p>{gameSave.timestamp}</p>
      </div>
    </div>
  );
}
