import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
} from "react-router-dom";
import { gameLoader, gameSavesLoader } from "../utils";
import Game from "./Game";
import { About, Leaderboard, Options } from "./startPage";
import LoadGame from "./startPage/LoadGame";
import NewGame from "./startPage/NewGame";
import SharedStartMenu from "./startPage/SharedStartMenu";

export const router = createBrowserRouter(
  createRoutesFromElements(
    <>
      {/* parent Route /, SharedStartMenu is rendered for all children using Outlet */}
      <Route path="/" element={<SharedStartMenu />}>
        <Route path="newGame" element={<NewGame />} />
        <Route path="leaderboard" element={<Leaderboard />} />
        <Route path="options" element={<Options />} />
        <Route
          path="loadGame"
          element={<LoadGame />}
          loader={gameSavesLoader}
        />
        <Route path="about" element={<About />} />
      </Route>
      {/* load the appropriate game */}
      <Route path="/:gameId" element={<Game />} loader={gameLoader} />
    </>
  )
);
