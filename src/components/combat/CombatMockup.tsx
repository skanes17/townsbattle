import React from "react";

/* TODO: Figure out how to place friendly divs in grid form, enemies start from top right */

export default function CombatMockup() {
  return (
    <body className="grid min-h-screen auto-rows-auto grid-cols-12 gap-6 p-4">
      <div className="square col-span-4 col-start-1 mx-auto grid w-full max-w-xs grid-flow-row justify-self-start bg-blue-500">
        Friendlies
        {/* <div className="bg-red-700 ">M</div>
        <div className="bg-blue-700 ">P</div>
        <div className="bg-red-700 ">M</div>
        <div className="bg-red-700 ">M</div>
        <div className="bg-green-700 ">T</div> */}
      </div>
      <div className="col-span-4 col-start-5 row-span-2 row-start-1 h-2/5 w-full grid-flow-row auto-rows-max justify-self-center bg-gray-500">
        Log
      </div>
      <div className="square col-span-4 col-start-9 mx-auto grid w-full max-w-xs grid-flow-row auto-rows-max justify-self-end bg-red-500">
        Enemies
        {/* <div className="bg-red-700 ">M</div>
        <div className="bg-blue-700 ">P</div>
        <div className="bg-red-700 ">M</div>
        <div className="bg-red-700 ">M</div>
        <div className="bg-green-700 ">T</div> */}
      </div>
      <div className="square card col-span-5 col-start-1 row-start-2  mx-auto w-4/5 max-w-xs bg-blue-400 px-4">
        Friendly Card
      </div>
      <div className="col-span-4 col-start-5 row-start-2 mx-auto grid h-5/6 w-4/5 grid-rows-2 gap-4 self-center bg-amber-100/25 text-center">
        <div>
          <div className="p-6 text-lg ">
            Possible flavour text here, sometimes. Lorem ipsum dolor sit amet,
            consectetur adipiscing elit. Ut facilisis elit odio, vitae varius
            ante ultricies sed.
          </div>
        </div>
        <div>
          <div className="mx-auto w-3/4 bg-gray-500 p-2 text-5xl ">
            Button 1
          </div>
          <div className="mx-auto w-1/2 bg-gray-500 p-2 text-3xl">Button 2</div>
        </div>
      </div>
      <div className="square card col-span-5 col-start-8 row-start-2 mx-auto w-4/5 max-w-xs bg-blue-400 px-4">
        Enemy Card
      </div>
    </body>
  );
}
