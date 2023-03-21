import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
} from "react-router-dom";
import { gameSavesLoader, newGameLoader } from "../utils";
import Game from "./Game";
import { About, Leaderboards, Options } from "./startPage";
import LoadGame from "./startPage/LoadGame";
import NewGame from "./startPage/NewGame";
import SharedStartMenu from "./startPage/SharedStartMenu";

export const router = createBrowserRouter(
  createRoutesFromElements(
    <>
      {/* parent Route /, SharedStartMenu is rendered for all children using Outlet */}
      <Route path="/" element={<SharedStartMenu />}>
        {/* TODO: Make a New Game and Load Game, with Load Game disabled if no saves */}
        <Route path="newGame" element={<NewGame />} loader={newGameLoader} />
        <Route path="leaderboards" element={<Leaderboards />} />
        <Route path="options" element={<Options />} />
        <Route
          path="loadGame"
          element={<LoadGame />}
          loader={gameSavesLoader}
        />
        <Route path="about" element={<About />} />
      </Route>
      {/* load the appropriate game */}
      <Route path="/:gameId" element={<Game />} />
    </>
  )
);
