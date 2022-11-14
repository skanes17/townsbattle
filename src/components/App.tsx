import React from "react";
import Game from "./Game";
import GameCopy from "./GameCopy";

export default function App() {
  return (
    <div>
      {/* switch between Game and GameCopy for TS testing */}
      <GameCopy />
    </div>
  );
}
