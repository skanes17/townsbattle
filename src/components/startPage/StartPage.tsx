import React, { useState } from "react";
import { Routes, Route, Link } from "react-router-dom";
import { routerLinkStyle } from "../../tailwindStyles/RouterLinkStyle";
import StartState from "../../types/Start";
import Button from "../buttons/Button";
// import About from "./About";
// import HowToPlay from "./HowToPlay";
// import Leaderboards from "./Leaderboards";
//import MenuItem from "./MenuItem";
// import MenuTitle from "./MenuTitle";
//import Options from "./Options";
// import Play from "./Play";
import {
  About,
  HowToPlay,
  Leaderboards,
  MenuInput,
  MenuItem,
  MenuTitle,
  Options,
  Play,
  PopupModal,
} from "../startPage";

export default function StartPage() {
  /* FIXME: How to replace my separate state variables with this? How to update state? */
  const [startState, setStartState] = useState<StartState>({
    onStartPage: true,
    townName: "",
    defaultTownName: "Townsburg",
    difficulty: "normal",
    tutorials: true,
  });

  /* OLD STRUCTURE - Separate State Variables
  const [townName, setTownName] = useState("");
  const defaultTownName = "Townsburg";
  const [difficulty, setDifficulty] = useState<Difficulty>("normal");
  const [tutorials, setTutorials] = useState(true);
  */

  const [onStartPage, setOnStartPage] = useState(true);

  const startGame = () => {
    setStartState({ ...startState, onStartPage: !onStartPage });
    /* OLD --> setOnStartPage(!onStartPage); */
  };

  // TODO: 1-Turn the following into a main page with "/"
  // TODO: 2-Use <Outlet/> to display the common UI, eg MenuTitle, MenuItems, etc
  // TODO: 3-Once "/play" settings have been set, use <Link state={startState}> to send state to <Game>
  return (
    <>
      {/* FIXME: Much repetition within Leaderboards, Options, etc components. Consider DRYing it out */}
      <Route
        path="/play"
        element={<Play startState={startState} setStartState={setStartState} />}
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
