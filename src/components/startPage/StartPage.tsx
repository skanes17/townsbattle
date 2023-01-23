import React, { useState } from "react";
import { Routes, Route, Link } from "react-router-dom";
import { routerLinkStyle } from "../../tailwindStyles/RouterLinkStyle";
import { Difficulty } from "../../types";
import Button from "../buttons/Button";
// import About from "./About";
// import HowToPlay from "./HowToPlay";
// import Leaderboards from "./Leaderboards";
//import MenuItem from "./MenuItem";
// import MenuTitle from "./MenuTitle";
//import Options from "./Options";
// import Play from "./Play";
import { About, HowToPlay, Leaderboards, Options, Play } from "../startPage";

export default function StartPage() {
  const [onStartPage, setOnStartPage] = useState(true);
  const [townName, setTownName] = useState("");
  const defaultTownName = "Townsburg";
  const [difficulty, setDifficulty] = useState<"easy" | "normal" | "hard">(
    "normal"
  );
  const [tutorials, setTutorials] = useState(true);

  const startGame = () => {
    setOnStartPage(!onStartPage);
  };

  return (
    <>
      {/* FIXME: Much repetition within Leaderboards, Options, etc components. Consider DRYing it out */}
      <Route
        path="/play"
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
      <Route path="/leaderboards" element={<Leaderboards />} />
      <Route path="/options" element={<Options />} />
      <Route path="/howtoplay" element={<HowToPlay />} />
      <Route path="/about" element={<About />} />

      <Button buttonColor="red" onClick={startGame}>
        Planning/Combat
      </Button>
    </>
  );
}
