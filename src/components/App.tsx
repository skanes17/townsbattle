import React, { useState, MouseEvent } from "react";
import { Route, Routes } from "react-router-dom";
import Game from "./Game";
import { About, HowToPlay, Leaderboards, Options, Play } from "./startPage";
import SharedStartMenu from "./startPage/SharedStartMenu";

export default function App() {
  const handleRightClick = (event: MouseEvent<HTMLDivElement>) => {
    // prevent the default behavior of the right-click context menu
    event.preventDefault();
  };

  return (
    <div
      className="select-none bg-zinc-900 font-sans text-stone-200"
      onContextMenu={handleRightClick}
    >
      <Routes>
        {/* parent Route /, SharedStartMenu is rendered for all children using Outlet */}
        <Route path="/" element={<SharedStartMenu />}>
          {/* TODO: Make a New Game and Load Game, with Load Game disabled if no saves */}
          <Route path="play" element={<Play />} />
          <Route path="leaderboards" element={<Leaderboards />} />
          <Route path="options" element={<Options />} />
          <Route path="howtoplay" element={<HowToPlay />} />
          <Route path="about" element={<About />} />
        </Route>

        <Route path="/play/game" element={<Game />} />
      </Routes>
    </div>
  );
}
