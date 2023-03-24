import { useState } from "react";
import { Link } from "react-router-dom";
import { GameSave } from "../../types";
import { MenuBox, MenuBoxHeader, MenuButtonContainer } from ".";

export default function Leaderboard() {
  // pull existing saved options from local storage
  const leaderboard: GameSave[] = JSON.parse(
    localStorage.getItem("leaderboard") || "[]"
  );

  const sortedLeaderboard = leaderboard.sort((a, b) => b.score - a.score);

  return (
    <MenuBox headerText="Leaderboard" icon="🏆">
      <MenuBoxHeader>
        Look back on past games. Try to beat the High score!
      </MenuBoxHeader>

      {/* TODO: Expand out to show details */}

      {sortedLeaderboard.length > 0 && (
        <table className="my-2 w-full max-w-full table-auto border-separate border-spacing-[0.125rem] overflow-x-auto rounded-lg border-2 border-white/25 p-1 text-white transition-all hover:border-spacing-0">
          <thead className="rounded-tl-lg bg-black/50 text-center">
            <tr>
              <th className="rounded-tl-lg">Rank</th>
              <th>Player</th>
              <th className="hidden rounded-tr-lg sm:table-cell sm:rounded-none">
                Town
              </th>
              <th className="rounded-tr-lg">Difficulty</th>
              <th className="rounded-tr-lg">Score</th>
            </tr>
          </thead>
          <tbody className="text-center">
            {sortedLeaderboard.map((save, index) => (
              <tr
                key={save.gameId}
                className="first:text-amber-400 odd:bg-blue-900/50 even:bg-blue-800/50 hover:bg-amber-500 hover:text-black"
              >
                <td className="font-normal">{index + 1}</td>
                <td className="overflow-y-auto font-normal">
                  {save.playerName}
                </td>
                <td className="hidden font-normal sm:table-cell">
                  {save.townName}
                </td>
                <td className="font-normal capitalize">{save.difficulty}</td>
                <td className="font-normal">{save.score}</td>
              </tr>
            ))}
          </tbody>
        </table>
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
