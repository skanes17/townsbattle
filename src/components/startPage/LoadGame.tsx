import React from "react";
import { Link } from "react-router-dom";
import { MenuBoxHeader } from ".";
import MenuBox from "./MenuBox";

export default function LoadGame() {
  // TODO: Pull real game saves from loadGameLoader! They'll be in localStorage
  // gameId will come from the game saves
  // that ID will be passed to the <Game /> Route, which lives in <App/>
  // the <Game /> Route will need its own loader -- that will simply pull the ID from the params and load the  appropriate save from localStorage
  // Note: Play will have to be turned into "New Game" or similar. It will always start a new save, with a new ID. It will be separate/different from this process.

  const dummyGameSaves = [
    {
      gameId: 1234,
      playerName: "Scott",
      townName: "Scrotestamp",
      score: 3145,
    },
    {
      gameId: 2112,
      playerName: "Wesley",
      townName: "Bombirdiosa",
      score: 4400,
    },
  ];

  // this would exist because <Game> would have saved something by now
  localStorage.setItem("gameSaves", JSON.stringify(dummyGameSaves));

  const loadGameLoader = () => {
    const savesArray = JSON.parse(localStorage.getItem("gameSaves") ?? "[]");
    return savesArray;
  };

  console.log(loadGameLoader());

  // REMEMBER: Basic Structure is in paper notes
  // LoadGame is a Route
  // That Route will have a loader=loadGameLoader
  // it loads the saves which are currently found in localStorage (eventually could be fetched by API with backend)
  // Once those saves are loaded into the component, they'll be accessed then mapped similar to the process seen below
  // When the Link is clicked, it'll pass the unique ID
  // That links to a Route which uses dynamic routing -- eg <Route path ="/:${save.gameId}" /> or whatever else is needed
  // Game uses useParams to grab that ID, and it'll get the proper save data to show in the game
  // That game data is then saved to state immediately upon loading, and the game should pick up in the right place

  return (
    <MenuBox headerText="Load Game" icon="💾">
      <MenuBoxHeader>
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Fugit vel
        suscipit fuga impedit explicabo, consequuntur at corrupti, est, culpa
        nostrum recusandae debitis distinctio odio repellendus voluptatum
        asperiores harum facilis mollitia.
      </MenuBoxHeader>

      <div className="mt-3 items-center gap-2 sm:flex">
        {dummyGameSaves.map((save, index) => (
          <Link
            className="mt-2 w-full flex-1 rounded-md bg-orange-600 p-2.5 text-white outline-transparent ring-green-600 ring-offset-2 focus:ring-2"
            to={`/:${save.gameId}`}
          >
            <div className="grid auto-rows-auto">
              <p>{index + 1}</p>
              <p>Player: {save.playerName}</p>
              <p>Town: {save.townName}</p>
              <p>Score: {save.score}</p>
            </div>
          </Link>
        ))}

        <Link
          className="mt-2 w-full flex-1 rounded-md bg-green-600 p-2.5 text-white outline-transparent ring-green-600 ring-offset-2 focus:ring-2"
          to="/"
          /* onClick={toggleLeaderboardModal} */
        >
          Close
        </Link>
      </div>
    </MenuBox>
  );
}
