import { useState } from "react";
import { Link } from "react-router-dom";
import { GameSave } from "../../types";
import { deleteThisSaveAndUpdateLocalStorage } from "../../utils";
import { SaveFileData } from "./SaveFileData";

interface SaveFileLinkProps {
  gameSave: GameSave;
}

export function SaveFileLink({ gameSave }: SaveFileLinkProps) {
  const [counter, setCounter] = useState(0);

  return (
    <div className="m-1 grid grid-cols-[9fr_1fr] gap-2">
      {counter < 2 && (
        <Link
          className="rounded-md border-2 border-white/5 bg-blue-800/50 p-2 text-white outline-transparent ring-white ring-offset-1 hover:border-white/50 hover:bg-blue-800/75 focus:ring-1"
          to={`/${gameSave.gameId}`}
        >
          <SaveFileData gameSave={gameSave} />
        </Link>
      )}
      <button
        type="button"
        className="w-24 place-self-center rounded-md border-2 border-white/5 bg-red-700 p-2 font-math text-white outline-transparent ring-white ring-offset-1 hover:border-white/50 hover:bg-red-800 focus:ring-1"
        onClick={
          counter < 2
            ? () => setCounter((prev) => prev + 1)
            : () => {
                setCounter((prev) => prev + 1);
                deleteThisSaveAndUpdateLocalStorage(gameSave);
              }
        }
      >
        {counter === 0 && "✖"}
        {counter === 1 && "For sure?"}
        {counter === 2 && "Deleted!"}
      </button>
    </div>
  );
}
