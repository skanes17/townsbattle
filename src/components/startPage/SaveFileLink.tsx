import { Link } from "react-router-dom";
import { GameSave } from "../../types";
import { SaveFileData } from "./SaveFileData";

interface SaveFileLinkProps {
  gameSave: GameSave;
}

export function SaveFileLink({ gameSave }: SaveFileLinkProps) {
  return (
    <Link
      className="my-1 rounded-md border-2 border-white/5 bg-blue-800/50 p-2.5 text-white outline-transparent ring-white ring-offset-1 hover:border-white/50 hover:bg-blue-800/75 focus:ring-1"
      to={`/${gameSave.gameId}`}
    >
      <SaveFileData gameSave={gameSave} />
    </Link>
  );
}
