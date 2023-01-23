import React, { useState } from "react";
import { Route, Routes } from "react-router-dom";
import Game from "./Game";
import { About, HowToPlay, Leaderboards, Options, Play } from "./startPage";
import SharedStartMenu from "./startPage/SharedStartMenu";

export default function App() {
  return (
    <div className="bg-zinc-900 font-sans text-stone-200">
      <Routes>
        {/* parent Route /, SharedStartMenu is rendered for all children using Outlet */}
        <Route path="/" element={<SharedStartMenu />}>
          <Route path="play" element={<Play />} />
          <Route path="leaderboards" element={<Leaderboards />} />
          <Route path="options" element={<Options />} />
          <Route path="howtoplay" element={<HowToPlay />} />
          <Route path="about" element={<About />} />
        </Route>

        {/* incorporate some default game state for if /play is bypassed  */}
        {/* could check if Link state data is empty, if so, use the defaults */}
        <Route path="/play/game" element={<Game />} />
      </Routes>
    </div>
  );
}

// TODO: Once "/play" settings have been set, use <Link state={startState}> to send state to <Game>
