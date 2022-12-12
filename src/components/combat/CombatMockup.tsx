import React from "react";
import Button from "../buttons/Button";

/* TODO: Figure out how to place friendly divs in grid form, enemies start from top right */

export default function CombatMockup() {
  return (
    // grid for the whole page
    <body className="grid min-h-screen grid-cols-12 grid-rows-4 place-content-stretch gap-2 p-4">
      {/* sub grid to control squares for units -- use different sizes per screen*/}
      {/* columns/rows could be conditionally rendered by unit count (eg 5x5 for 25 units) */}
      <div className="square col-span-4 col-start-1 row-span-2 row-start-1 mx-auto grid w-full max-w-sm grid-flow-row-dense self-center bg-blue-500">
        <div className="square max-w-min bg-red-700">M</div>
        <div className="square max-w-min bg-blue-700">P</div>
        <div className="square max-w-min bg-red-700">M</div>
        <div className="square max-w-min bg-red-700">M</div>
        <div className="square max-w-min bg-green-700">T</div>
      </div>
      <div className="col-span-4 col-start-5 row-span-2 row-start-1 aspect-[5/3] w-full grid-flow-row self-center rounded-md bg-gray-500 p-4">
        Log
      </div>
      <div className="square col-span-4 col-start-9 row-span-2 row-start-1 mx-auto grid w-full max-w-sm grid-flow-col self-center bg-red-500">
        Enemies
      </div>
      <div className="card col-span-5 col-start-1 row-span-3 row-start-3 mr-4 w-4/5 max-w-xs justify-self-end rounded-md bg-blue-400 px-4">
        Friendly Card
      </div>

      <div className=" md:text-md col-span-4 col-start-5 row-start-3 flex h-full w-1/2 items-center place-self-center bg-gray-200/10 p-2 text-center text-xs sm:text-sm lg:text-lg xl:text-xl">
        <p>
          Possible flavour text here, sometimes. Maybe. It depends. What'd you
          like?
        </p>
      </div>

      <div className="col-span-2 col-start-6 row-start-4 mx-auto p-4">
        <div className="h-100% flex justify-center pb-4">
          <Button buttonColor="blue" onClick={() => ""}>
            Fight!
          </Button>
        </div>
        <div className="flex justify-center">
          <Button buttonColor="red" onClick={() => ""}>
            Auto
          </Button>
        </div>
      </div>

      <div className="card col-span-5 col-start-8 row-span-3 row-start-3 ml-4 w-4/5 max-w-xs justify-self-start rounded-md bg-red-400 px-4">
        Enemy Card
      </div>
    </body>
  );
}
