import { createBrowserRouter } from "react-router-dom";
import Game from "./Game";
import { About, HowToPlay, Leaderboards, Options, Play } from "./startPage";
import SharedStartMenu from "./startPage/SharedStartMenu";

export const router = createBrowserRouter([
  {
    path: "/",
    /* parent Route /, SharedStartMenu is rendered for all children using Outlet */
    element: <SharedStartMenu />,
    children: [
      /* TODO: Make a New Game and Load Game, with Load Game disabled if no saves */
      {
        path: "play",
        element: <Play />,
      },
      {
        path: "leaderboards",
        element: <Leaderboards />,
      },
      {
        path: "options",
        element: <Options />,
      },
      {
        path: "howtoplay",
        element: <HowToPlay />,
      },
      {
        path: "about",
        element: <About />,
      },
    ],
  },
  { path: "/play/game", element: <Game /> },
]);
