import React from "react";
import { Link } from "react-router-dom";
import MenuBox from "./MenuBox";

export default function Leaderboards() {
  return (
    <MenuBox headerText="Leaderboards" icon="🏆">
      <p className="mt-2 leading-relaxed text-gray-500">
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Fugit vel
        suscipit fuga impedit explicabo, consequuntur at corrupti, est, culpa
        nostrum recusandae debitis distinctio odio repellendus voluptatum
        asperiores harum facilis mollitia.
      </p>

      <div className="mt-3 items-center gap-2 sm:flex">
        <Link
          className="mt-2 w-full flex-1 rounded-md bg-green-600 p-2.5 text-white outline-none ring-green-600 ring-offset-2 focus:ring-2"
          to="/"
          /* onClick={toggleLeaderboardModal} */
        >
          Close
        </Link>
      </div>
    </MenuBox>
  );
}
