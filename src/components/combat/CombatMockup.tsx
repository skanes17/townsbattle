import React from "react";
import Button from "../buttons/Button";

/* TODO: Figure out how to place friendly divs in grid form, enemies start from top right */

export default function CombatMockup() {
  return (
    // grid for the whole page
    <body className="grid min-h-screen auto-rows-auto grid-cols-12 gap-6 p-4">
      {/* sub grid to control squares for units -- use different sizes per screen*/}
      <div className="col-span-4 col-start-1 mx-auto grid h-5/6 w-full max-w-sm grid-flow-col justify-self-start bg-blue-500">
        <div className="square w-full bg-red-700">M</div>
        <div className="square w-full bg-blue-700">P</div>
        <div className="square w-full bg-red-700">M</div>
        <div className="square w-full bg-red-700">M</div>
        <div className="square w-full bg-green-700">T</div>
      </div>
      <div className="col-span-4 col-start-5 row-start-1 h-full w-full grid-flow-row auto-rows-max self-center justify-self-center rounded-md bg-gray-500 p-4">
        Log
      </div>
      <div className="square col-span-4 col-start-9 mx-auto grid h-5/6 w-full max-w-sm grid-flow-row auto-rows-max justify-self-end bg-red-500">
        Enemies
      </div>
      <div className="square card col-span-5 col-start-1 row-start-2  mx-auto w-4/5 max-w-xs rounded-md bg-blue-400 px-4">
        Friendly Card
      </div>
      <div className="col-span-4 col-start-5 row-start-2 mx-auto grid h-5/6 max-h-96 w-4/5 grid-rows-2 items-center justify-items-center gap-4 self-center bg-amber-100/25 text-center">
        <div>
          <div className="text-md p-6">
            Possible flavour text here, sometimes. Lorem ipsum dolor sit amet,
            consectetur adipiscing elit. Ut facilisis elit odio, vitae varius
            ante ultricies sed.
          </div>
        </div>
        <Button buttonColor="blue" onClick={() => ""}>
          Fight!
        </Button>
        <Button buttonColor="red" onClick={() => ""}>
          Auto
        </Button>
      </div>
      <div className="square card col-span-5 col-start-8 row-start-2 mx-auto w-4/5 max-w-xs rounded-md bg-red-400 px-4">
        Enemy Card
      </div>
    </body>
  );
}
