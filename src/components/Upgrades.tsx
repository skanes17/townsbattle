import React from "react";

export default function Upgrades() {
  return (
    <div className="displayUpgrades">
      <div className="upgradesTitle" style={{ fontWeight: "bold" }}>
        {/* TODO: Add functionality to use resources to make buildings
          Stretch Goal: Drag and drop for resources */}
        Available Upgrades
      </div>
      <div>Upgrade Axes (+1 to wood per villager)</div>
      <button className="bg-white hover:bg-gray-100 text-gray-800 font-semibold py-1 px-2 border border-gray-400 rounded shadow">
        Pay 2 wood
      </button>
      <button className="bg-white hover:bg-gray-100 text-gray-800 font-semibold py-1 px-2 border border-gray-400 rounded shadow">
        Pay 2 stone
      </button>
      <div>Upgrade Pickaxes (+1 to stone per villager)</div>
      <button className="bg-white hover:bg-gray-100 text-gray-800 font-semibold py-1 px-2 border border-gray-400 rounded shadow">
        Pay 2 wood
      </button>
      <button className="bg-white hover:bg-gray-100 text-gray-800 font-semibold py-1 px-2 border border-gray-400 rounded shadow">
        Pay 2 iron
      </button>
      <div>Build Town Hall (+1 free workers per turn)</div>
      <button className="bg-white hover:bg-gray-100 text-gray-800 font-semibold py-1 px-2 border border-gray-400 rounded shadow">
        Pay 2 wood
      </button>
      <button className="bg-white hover:bg-gray-100 text-gray-800 font-semibold py-1 px-2 border border-gray-400 rounded shadow">
        Pay 2 stone
      </button>
      <button className="bg-white hover:bg-gray-100 text-gray-800 font-semibold py-1 px-2 border border-gray-400 rounded shadow">
        Pay 2 iron
      </button>
    </div>
  );
}
