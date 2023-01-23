import React, { useState } from "react";
import { Route, Routes } from "react-router-dom";
import StartState from "../types/Start";
import Button from "./buttons/Button";
import { Play, Leaderboards, Options, HowToPlay, About } from "./startPage";
import SharedStartMenu from "./startPage/SharedStartMenu";
import StartPage from "./startPage/StartPage";

export default function App() {
  const [startState, setStartState] = useState<StartState>({
    onStartPage: true,
    townName: "",
    defaultTownName: "Townsburg",
    difficulty: "normal",
    tutorials: true,
  });

  const [onStartPage, setOnStartPage] = useState(true);

  const startGame = () => {
    setStartState({ ...startState, onStartPage: !onStartPage });
    /* OLD --> setOnStartPage(!onStartPage); */
  };

  return (
    <div className="bg-zinc-900 font-sans text-stone-200">
      <Routes>
        {/* parent Route, /, should render SharedStartMenu for all children */}
        <Route path="/" element={<SharedStartMenu />}>
          {/* <Route index element={<StartPage />} /> */}
          <Route
            path="play"
            element={
              <Play startState={startState} setStartState={setStartState} />
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

/*
<Routes>
        <Route
          path="/play"
          element={
            <Play startState={startState} setStartState={setStartState} />
          }
        /> */

/* 
<Route path="/books">
    <Route index element={<BookList />} />
    <Route path=":id" element={<Book />} />
    <Route path="new" element={<NewBook />} />
</Route>
*/
