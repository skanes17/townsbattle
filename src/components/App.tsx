import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
} from "react-router-dom";
import Game from "./Game";
import { About, HowToPlay, Leaderboards, Options, Play } from "./startPage";
import LoadGame from "./startPage/LoadGame";
import SharedStartMenu from "./startPage/SharedStartMenu";

export const router = createBrowserRouter(
  createRoutesFromElements(
    <>
      {/* parent Route /, SharedStartMenu is rendered for all children using Outlet */}
      <Route path="/" element={<SharedStartMenu />}>
        {/* TODO: Make a New Game and Load Game, with Load Game disabled if no saves */}
        <Route path="play" element={<Play />} />
        <Route path="leaderboards" element={<Leaderboards />} />
        <Route path="options" element={<Options />} />
        <Route path="loadGame" element={<LoadGame />} />
        <Route path="about" element={<About />} />
      </Route>
      <Route path="/play/:gameId" element={<Game />} />
    </>
  )
);
