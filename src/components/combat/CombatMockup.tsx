import React from "react";
import Button from "../buttons/Button";

/* TODO: Figure out how to place friendly divs in grid form, enemies start from top right */

export default function CombatMockup() {
  return (
    // grid for the whole page
    <body className="grid min-h-screen grid-cols-12 grid-rows-4 place-content-stretch gap-2 p-4">
      {/* sub grid to control squares for units -- use different sizes per screen*/}
      <div className="square col-span-4 col-start-1 row-span-2 row-start-1 mx-auto grid w-full max-w-sm grid-flow-col self-center bg-blue-500">
        <div className="square w-full bg-red-700">M</div>
        <div className="square w-full bg-blue-700">P</div>
        <div className="square w-full bg-red-700">M</div>
        <div className="square w-full bg-red-700">M</div>
        <div className="square w-full bg-green-700">T</div>
      </div>
      <div className="col-span-4 col-start-5 row-span-2 row-start-1 aspect-[5/3] w-full grid-flow-row self-center rounded-md bg-gray-500 p-4">
        Log
      </div>
      <div className="square col-span-4 col-start-9 row-span-2 row-start-1 mx-auto grid w-full max-w-sm grid-flow-col self-center bg-red-500">
        Enemies
      </div>
      <div className="card col-span-5 col-start-1 row-span-3 row-start-3 w-4/5 max-w-xs justify-self-end rounded-md bg-blue-400 px-4">
        Friendly Card
      </div>

      <div className="col-span-4 col-start-5 row-start-3 w-1/2 place-self-center p-4 text-center text-lg">
        <p>Possible flavour text here, sometimes.</p>
      </div>

      <div className="col-span-2 col-start-6 row-start-4 mx-auto p-4">
        <div className="flex justify-center pb-4">
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

      <div className="card col-span-5 col-start-8 row-span-3 row-start-3 w-4/5 max-w-xs justify-self-start rounded-md bg-red-400 px-4">
        Enemy Card
      </div>
    </body>
  );
}
