import React, { useState } from "react";
import { Routes, Route, Link } from "react-router-dom";
import { Difficulty } from "../../types/Difficulty";
import Button from "../buttons/Button";
import About from "./About";
import HowToPlay from "./HowToPlay";
import Leaderboards from "./Leaderboards";
import MenuItem from "./MenuItem";
import MenuTitle from "./MenuTitle";
import Options from "./Options";
import Play from "./Play";

export default function StartPage() {
  const [onStartPage, setOnStartPage] = useState(true);

  const [townName, setTownName] = useState("");
  const defaultTownName = "Townsburg";
  const [difficulty, setDifficulty] = useState<Difficulty>("normal");
  const [tutorials, setTutorials] = useState(true);

  const startGame = () => {
    setOnStartPage(!onStartPage);
  };

  const routerLinkStyle =
    "flex w-3/5 flex-row justify-between rounded-md bg-indigo-800 p-1 text-base text-slate-200 hover:bg-indigo-900 active:scale-95 sm:text-xl md:p-2 md:text-2xl lg:text-3xl xl:p-3 xl:text-4xl";

  return (
    <>
      <div className="flex h-screen flex-col items-center justify-center">
        <div className="m-1 grid auto-rows-min place-items-center gap-1 rounded bg-white/5 p-4 shadow-inherit">
          <MenuTitle title="Townsbattle" subtitle="The Game" />
          <Link className={routerLinkStyle} to="/play">
            <MenuItem text="Play" icon="▶️" />
          </Link>
          <Link className={routerLinkStyle} to="/leaderboards">
            <MenuItem text="Leaderboards" icon="🏆" />
          </Link>

          <Link className={routerLinkStyle} to="/options">
            <MenuItem text="Options" icon="🔧" />
          </Link>

          <Link className={routerLinkStyle} to="/howtoplay">
            <MenuItem text="How to Play" icon="❓" />
          </Link>

          <Link className={routerLinkStyle} to="/about">
            <MenuItem text="About" icon="⭐" />
          </Link>
        </div>
      </div>

      {/* TODO: Much repetition within Leaderboards, Options, etc components. Consider DRY it */}
      <Routes>
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
      </Routes>

      <Button buttonColor="red" onClick={startGame}>
        Planning/Combat
      </Button>
    </>
  );
}
