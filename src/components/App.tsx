import React, { useState } from "react";
import { Route, Routes } from "react-router-dom";
import Button from "./buttons/Button";
import { Play, Leaderboards, Options, HowToPlay, About } from "./startPage";
import SharedStartMenu from "./startPage/SharedStartMenu";
import StartPage from "./startPage/StartPage";

export default function App() {
  const [onStartPage, setOnStartPage] = useState(true);
  const startGame = () => {
    setOnStartPage(!onStartPage);
  };

  const [townName, setTownName] = useState("");
  const defaultTownName = "Townsburg";
  const [difficulty, setDifficulty] = useState<"easy" | "normal" | "hard">(
    "normal"
  );
  const [tutorials, setTutorials] = useState(true);

  return (
    <div className="bg-zinc-900 font-sans text-stone-200">
      <Routes>
        {/* parent Route /, SharedStartMenu is rendered for all children using Outlet */}
        <Route path="/" element={<SharedStartMenu />}>
          <Route
            path="play"
            element={
              <Play
                townName={townName}
                setTownName={setTownName}
                defaultTownName={defaultTownName}
                difficulty={difficulty}
                setDifficulty={setDifficulty}
                tutorials={tutorials}
                setTutorials={setTutorials}
              />
            }
          />
          <Route path="leaderboards" element={<Leaderboards />} />
          <Route path="options" element={<Options />} />
          <Route path="howtoplay" element={<HowToPlay />} />
          <Route path="about" element={<About />} />
        </Route>
      </Routes>

      <Button buttonColor="red" onClick={startGame}>
        Planning/Combat
      </Button>
    </div>
  );
}

// TODO: 1-DONE-Turn the following into a main page with "/"
// TODO: 2-DONE-Use <Outlet/> to display the common UI, eg MenuTitle, MenuItems, etc
// TODO: 3-Once "/play" settings have been set, use <Link state={startState}> to send state to <Game>
