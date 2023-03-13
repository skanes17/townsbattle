import { Tutorials } from "../types/TutorialTypes";

// images can be pulled from their respective objects
export const TutorialMessages: Tutorials = {
  resources: {
    category: "Resources",
    tutorial: (
      <>
        <p>
          <span className="font-bold text-indigo-400">Townsbattle</span> is a
          turn-based game with two main phases:{" "}
        </p>
        <p className="text-center">
          <span className="font-semibold text-amber-400">Planning</span> and{" "}
          <span className="font-semibold text-amber-400">Combat</span>
        </p>
        <p>
          In <span className="font-semibold text-amber-400">Planning</span>,
          you'll spend resources to protect your town.
        </p>
        <p>
          In <span className="font-semibold text-amber-400">Combat</span>,
          you'll battle increasingly tough waves of enemies.
        </p>
        <p>
          To start, use your first turn to{" "}
          <span className="text-purple-400">assign workers</span> to{" "}
          <span className="text-purple-400">collect resources</span>.
        </p>
        <p>
          Use your next turns to collect more resources and/or{" "}
          <span className="text-purple-400">spend resources</span> to{" "}
          <span className="text-purple-400">train units</span>, and{" "}
          <span className="text-purple-400">construct buildings</span>!
        </p>
        <p className="text-right italic text-green-400">
          In the current version of the game you'll always get 1 resource per
          worker.
        </p>
      </>
    ),
  },
  training: {
    category: "Training",
    tutorial: (
      <>
        <p>
          The <span className="font-semibold text-red-400">enemy</span> is
          building an army and your town is in danger. Train units to fight
          back.
        </p>
        <p>
          All units have{" "}
          <span className="text-purple-400">🗡️ Attack Power</span> and{" "}
          <span className="text-purple-400">❤️ Health</span>.
        </p>
        <p>
          Some even have <span className="text-purple-400">🛡️ Armor</span>, and{" "}
          <span className="text-purple-400">special abilities</span>, like
          hitting first in{" "}
          <span className="font-semibold text-amber-400">Combat</span>.
        </p>
        <p>Hover or tap on cards to learn more!</p>
      </>
    ),
  },
  buildings: {
    category: "Buildings",
    tutorial: (
      <>
        <h3 className="font-semibold text-amber-400">Planning</h3>
        <p>
          Each building constructed will{" "}
          <span className="font-semibold text-green-400">unlock</span> something
          (new units, game-changing bonuses, etc).
        </p>
        <p>Read each card carefully to learn its effects!</p>
        <h3 className="font-semibold text-amber-400">Combat</h3>
        <p>
          Each building has health and protects your{" "}
          <span className="font-bold text-indigo-400">Town Center</span> during
          Combat. Your Town Center is your most important building, and if it's
          destroyed it's Game Over.
        </p>
        <h4 className="mx-4 font-semibold text-purple-400">
          How could a building get destroyed?
        </h4>
        <p className="mx-4">
          Enemy units that survive Combat damage and destroy buildings. Each
          unit chooses one random building to 🗡️ Attack, except your Town
          Center.
        </p>
        <p className="mx-4 text-right italic text-green-400">
          Your Town Center is only targeted when no other buildings are left
          standing.
        </p>
      </>
    ),
  },
  army: {
    category: "Army",
    tutorial: (
      <p>
        See your whole army, and check ❤️ Health levels, to help you plan for
        the next <span className="font-semibold text-amber-400">Combat</span>.
      </p>
    ),
  },
  planning: {
    category: "Planning",
    tutorial: (
      <>
        <p>Everything in one place!</p>
        <p>
          All <span className="font-semibold text-amber-400">Planning</span>{" "}
          screens are here, making it easier to plan your turns.
        </p>
      </>
    ),
  },
  combat: {
    category: "Combat",
    tutorial: (
      <>
        <p>Time to fight the enemy army!</p>
        <p>
          <span className="text-purple-400">Units are randomly selected</span>{" "}
          from each army to face off against each other. Generally,{" "}
          <span className="text-purple-400">
            units will attack each other at the same time
          </span>
          , and they will each{" "}
          <span className="text-purple-400">
            lose ❤️ Health equal to their opponent's 🗡️ Attack
          </span>
          .
        </p>
        <p>
          Once a pair of units is finished, new units will be randomly selected
          for the next matchup.
        </p>
        <p>This process continues until one of both armies are defeated!</p>
        <p className="mx-4 text-green-400">
          Some units have special abilities that let them change the flow of
          combat. For example, some units may hit their opponent first, and only
          take damage if their oppoent survives.
        </p>
        <p>
          Read each card carefully to learn their mechanics and build your army
          accordingly.
        </p>
      </>
    ),
  },
  score: {
    category: "Score",
    tutorial: (
      <>
        <p>
          <span className="text-green-400">Score</span> increases with every
          unit trained, building constructed, enemy defeated and battle won. The
          longer you survive, the higher score you'll get.
        </p>
        <p>
          Your chosen difficulty has a big effect on score.{" "}
          <span className="text-red-400">High-risk, high-reward!</span>
        </p>
      </>
    ),
  },
};
