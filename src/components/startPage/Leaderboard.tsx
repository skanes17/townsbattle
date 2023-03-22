import { useState } from "react";
import { Link } from "react-router-dom";
import { GameSave } from "../../types";
import { MenuBox, MenuBoxHeader, MenuButtonContainer } from ".";

export default function LeaderBoards() {
  const [counter, setCounter] = useState(0);
  const incrementPopupCounter = () => {
    setCounter((prev) => prev + 1);
  };

  // pull existing saved options from local storage
  const leaderboard: GameSave[] = JSON.parse(
    localStorage.getItem("leaderboard") || "{}"
  );

  // const sortedLeaderboards = leaderboard.sort((a, b) => a.score - b.score);

  return (
    <MenuBox headerText="Leaderboard" icon="🏆">
      <MenuBoxHeader>
        Look back on past games. Try to beat the High score!
      </MenuBoxHeader>

      {/* // TODO: Add delete save button to each save */}
      {leaderboard.length > 0 && (
        <table className="table-auto font-normal">
          <thead>
            <th>Player</th>
            <th>Town</th>
            <th>Score</th>
          </thead>
          <tbody>
            {leaderboard.map((save) => (
              <tr>
                <th>{save.playerName}</th>
                <th>{save.townName}</th>
                <th>{save.score}</th>
              </tr>
            ))}
          </tbody>
        </table>
      )}
      <Link
        className="mt-2 inline-flex w-1/4 justify-center rounded-md bg-green-600 p-2.5 text-white outline-transparent ring-green-600 ring-offset-2 focus:ring-2"
        to="/"
      >
        Close
      </Link>
    </MenuBox>
  );
}
