import { Tutorials } from "../types";

// images can be pulled from their respective objects
export const TutorialMessages: Tutorials = {
  score: {
    category: "Score",
    tutorial: (
      <>
        <p>
          Score increases with every unit trained, building constructed, enemy
          defeated and battle won. The longer you survive, the higher score
          you'll get.
        </p>
        <p>Difficulty has a big effect on score. High-risk, high-reward!</p>
      </>
    ),
  },
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
          To start, you'll spend your first turn assigning workers to collect
          resources.
        </p>
        <p>
          Use your next turns to spend resources, train units, and construct
          buildings!
        </p>
        <p className="italic">
          Note: In this version of the game you'll always get 1 resource per
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
          The enemy is building an army and your town is in danger. Train units
          to fight back.
        </p>
        <p>
          All units have 🗡️ Attack Power and ❤️ Health. Some even have 🛡️ Armor,
          and special abilties like hitting first in Combat. Hover or tap on
          cards to learn more!
        </p>
      </>
    ),
  },
  buildings: {
    category: "Buildings",
    tutorial: (
      <>
        <p>
          Each building constructed will unlock something. That could be a new
          unit type, or a game-changing bonus! Read each card carefully to learn
          its effects.
        </p>
        <p>
          Each building has health and protects your{" "}
          <span className="font-bold text-indigo-400">Town Center</span> during
          Combat. Your Town Center is your most important building, and if it's
          destroyed it's Game Over.
        </p>
        <p>
          Wondering how a building could get destroyed? Enemy units that survive
          Combat will damage and destroy buildings. Each unit will choose one
          random building to attack with their 🗡️ Attack, except your Town
          Center.
        </p>
        <p>
          Your Town Center will only be targeted when no other buildings are
          left standing.
        </p>
      </>
    ),
  },
  army: {
    category: "Army",
    tutorial: (
      <p>
        See your whole army and check health levels, to help you plan for the
        next Combat.
      </p>
    ),
  },
  planning: {
    category: "Planning",
    tutorial: (
      <p>
        Want everything, everywhere, all at once? Well this view's for you! All{" "}
        <span className="font-semibold text-amber-400">Planning</span> screens
        are here.
      </p>
    ),
  },
};
