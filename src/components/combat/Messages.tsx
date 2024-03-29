import {
  PreCombatEvent,
  MainCombatEvent,
  PostCombatEvent,
  SummaryEvent,
  NoArmyEvent,
  AoeOnDeathEvent,
} from "../../types";

/* TODO: Make flavourtexts based on unit type; see below in combat phase */

export const messages = {
  // preCombat, mainCombat, postCombat, summary, noArmy are the types
  preCombat: [
    // different indexes used for desired events/text
    (event: PreCombatEvent) => {
      return (
        <p>
          <span className="text-green-400">
            {event.data.friendly.randomName}
          </span>{" "}
          faces off against{" "}
          <span className="text-red-400">{event.data.enemy.randomName}</span>.
        </p>
      );
    },
    (event: PreCombatEvent) => {
      return (
        <p>
          <span className="text-green-400">
            {event.data.friendly.randomName}
          </span>{" "}
          jumps in and stares down{" "}
          <span className="text-red-400">{event.data.enemy.randomName}</span>.
        </p>
      );
    },
    (event: PreCombatEvent) => {
      return (
        <p>
          <span className="text-green-400">
            {event.data.friendly.randomName}
          </span>{" "}
          wants to try their luck against{" "}
          <span className="text-red-400">{event.data.enemy.randomName}</span>.
        </p>
      );
    },
    (event: PreCombatEvent) => {
      return (
        <p>
          <span className="text-green-400">
            {event.data.friendly.randomName}
          </span>{" "}
          sees{" "}
          <span className="text-red-400">{event.data.enemy.randomName}</span>{" "}
          and calls them something nasty.
        </p>
      );
    },
    (event: PreCombatEvent) => {
      return (
        <p>
          <span className="text-green-400">
            {event.data.friendly.randomName}
          </span>{" "}
          agrees to battle{" "}
          <span className="text-red-400">{event.data.enemy.randomName}</span>{" "}
          but they're not happy about it.
        </p>
      );
    },
    (event: PreCombatEvent) => {
      return (
        <p>
          The air crackles with tension as{" "}
          <span className="text-green-400">
            {event.data.friendly.randomName}
          </span>{" "}
          prepares to face{" "}
          <span className="text-red-400">{event.data.enemy.randomName}</span>.
        </p>
      );
    },
    (event: PreCombatEvent) => {
      return (
        <p>
          <span className="text-green-400">
            {event.data.friendly.randomName}
          </span>{" "}
          takes a deep breath and steps forward, ready to face{" "}
          <span className="text-red-400">{event.data.enemy.randomName}</span>.
        </p>
      );
    },
    (event: PreCombatEvent) => {
      return (
        <p>
          The battlefield falls silent as{" "}
          <span className="text-green-400">
            {event.data.friendly.randomName}
          </span>{" "}
          and{" "}
          <span className="text-red-400">{event.data.enemy.randomName}</span>{" "}
          prepare to engage.
        </p>
      );
    },
    (event: PreCombatEvent) => {
      return (
        <p>
          <span className="text-green-400">
            {event.data.friendly.randomName}
          </span>{" "}
          readies themselves, ready to take on{" "}
          <span className="text-red-400">{event.data.enemy.randomName}</span>.
        </p>
      );
    },
    (event: PreCombatEvent) => {
      return (
        <p>
          The tension between{" "}
          <span className="text-green-400">
            {event.data.friendly.randomName}
          </span>{" "}
          and{" "}
          <span className="text-red-400">{event.data.enemy.randomName}</span> is
          palpable as they face off.
        </p>
      );
    },
    (event: PreCombatEvent) => {
      return (
        <p>
          As{" "}
          <span className="text-green-400">
            {event.data.friendly.randomName}
          </span>{" "}
          approaches{" "}
          <span className="text-red-400">{event.data.enemy.randomName}</span>,
          they can feel the weight of their decisions pressing down on them.
        </p>
      );
    },
    (event: PreCombatEvent) => {
      return (
        <p>
          <span className="text-green-400">
            {event.data.friendly.randomName}
          </span>{" "}
          and{" "}
          <span className="text-red-400">{event.data.enemy.randomName}</span>{" "}
          lock eyes and ready themselves for the fight ahead.
        </p>
      );
    },
    (event: PreCombatEvent) => {
      return (
        <p>
          With a fierce battle cry,{" "}
          <span className="text-green-400">
            {event.data.friendly.randomName}
          </span>{" "}
          engages{" "}
          <span className="text-red-400">{event.data.enemy.randomName}</span>.
        </p>
      );
    },
    (event: PreCombatEvent) => {
      return (
        <p>
          <span className="text-green-400">
            {event.data.friendly.randomName}
          </span>{" "}
          draws strength from their determination as they prepare to engage{" "}
          <span className="text-red-400">{event.data.enemy.randomName}</span>.
        </p>
      );
    },
    (event: PreCombatEvent) => {
      return (
        <p>
          {event.data.friendly.randomName} and {event.data.enemy.randomName}{" "}
          share a silent moment of mutual respect before they begin their
          battle.
        </p>
      );
    },
    /* more alternatives here */
  ],
  mainCombat: [
    (event: MainCombatEvent) => {
      return (
        <p>
          <span className="text-green-400">
            {event.data.friendly.randomName}
          </span>{" "}
          {/* TODO: More of this type of conditional flavortext; focus on DRY */}
          {event.data.friendly.unitType === "villager" ? "flails at" : null}{" "}
          {event.data.friendly.unitType === "fighter" ? "slashes" : null}{" "}
          {event.data.friendly.unitType === "archer" ? "shoots at" : null}{" "}
          {event.data.friendly.unitType === "knight" ? "bashes" : null}{" "}
          {event.data.friendly.unitType === "mage" ? "casts a spell on" : null}{" "}
          {event.data.friendly.unitType === "bombird" ? "flies toward" : null}{" "}
          <span className="text-red-400">{event.data.enemy.randomName}</span>{" "}
          for{" "}
          <span className="text-amber-400">
            {event.data.friendly.attack} damage
          </span>{" "}
          and takes{" "}
          <span className="text-amber-400">
            {event.data.enemy.attack} damage
          </span>
          .
        </p>
      );
    },
    (event: MainCombatEvent) => {
      return (
        <p>
          <span className="text-green-400">
            {event.data.friendly.randomName}
          </span>{" "}
          attacks{" "}
          <span className="text-red-400">{event.data.enemy.randomName}</span>{" "}
          for{" "}
          <span className="text-amber-400">
            {event.data.friendly.attack} damage,
          </span>{" "}
          then takes{" "}
          <span className="text-amber-400">
            {event.data.enemy.attack} damage
          </span>
          .
        </p>
      );
    },
    (event: MainCombatEvent) => {
      return (
        <p>
          <span className="text-green-400">
            {event.data.friendly.randomName}
          </span>{" "}
          inflicts{" "}
          <span className="text-amber-400">
            {event.data.friendly.attack} damage
          </span>{" "}
          on <span className="text-red-400">{event.data.enemy.randomName}</span>
          , taking{" "}
          <span className="text-amber-400">
            {event.data.enemy.attack} damage
          </span>{" "}
          in return.
        </p>
      );
    },
    (event: MainCombatEvent) => {
      return (
        <p>
          <span className="text-green-400">
            {event.data.friendly.randomName}
          </span>{" "}
          does{" "}
          <span className="text-amber-400">
            {event.data.friendly.attack} damage
          </span>{" "}
          to <span className="text-red-400">{event.data.enemy.randomName}</span>{" "}
          and takes{" "}
          <span className="text-amber-400">
            {event.data.enemy.attack} damage
          </span>
          .
        </p>
      );
    },
  ],
  aoeOnDeath: [
    // idx: 0 -- Friendly Bombird explodes
    (event: AoeOnDeathEvent) => {
      return (
        <p className="bg-amber-400/5">
          <span className="text-green-400">
            {event.data.destroyedUnit.randomName}
          </span>{" "}
          <span className="font-semibold text-red-500">explodes,</span> doing{" "}
          <span className="font-semibold text-amber-400">
            {event.data.destroyedUnit.damageToOpponentOnDeath} damage
          </span>{" "}
          to{" "}
          <span className="text-red-400">
            {event.data.opposingUnit.randomName}
          </span>
          ! The blast hits{" "}
          {event.data.randomNamesOfUnitsAffectedByAoeDamage.length > 1 ? (
            <span className="text-red-400">
              {event.data.randomNamesOfUnitsAffectedByAoeDamage.join(" and ")}
            </span>
          ) : event.data.randomNamesOfUnitsAffectedByAoeDamage.length > 0 ? (
            <span className="text-red-400">
              {event.data.randomNamesOfUnitsAffectedByAoeDamage}
            </span>
          ) : (
            <span className="text-red-400">no one</span>
          )}{" "}
          in the enemy army for{" "}
          <span className="text-amber-400">
            {event.data.destroyedUnit.areaOfEffectDamageOnDeath}
          </span>{" "}
          damage.
        </p>
      );
    },
    // idx: 1 -- Enemy Bombird explodes
    (event: AoeOnDeathEvent) => {
      return (
        <p className="bg-amber-400/5">
          <span className="text-green-400">
            {event.data.opposingUnit.randomName}
          </span>{" "}
          is hit for{" "}
          <span className="font-semibold text-amber-400">
            {event.data.destroyedUnit.damageToOpponentOnDeath} damage
          </span>{" "}
          as{" "}
          <span className="text-red-400">
            {event.data.destroyedUnit.randomName}
          </span>{" "}
          <span className="font-semibold text-red-500">explodes</span>! The
          blast hits{" "}
          {event.data.randomNamesOfUnitsAffectedByAoeDamage.length > 1 ? (
            <span className="text-green-400">
              {event.data.randomNamesOfUnitsAffectedByAoeDamage.join(" and ")}
            </span>
          ) : event.data.randomNamesOfUnitsAffectedByAoeDamage.length > 0 ? (
            <span className="text-green-400">
              {event.data.randomNamesOfUnitsAffectedByAoeDamage}
            </span>
          ) : (
            <span className="text-green-400">no one</span>
          )}{" "}
          for{" "}
          <span className="text-amber-400">
            {event.data.destroyedUnit.areaOfEffectDamageOnDeath}
          </span>{" "}
          damage.
        </p>
      );
    },
  ],
  /* TODO: Include at least one message per possiblity (armies both survive, either one dies, both die). */
  postCombat: [
    // idx: 0 -- both units died
    (event: PostCombatEvent) => {
      return (
        <p>
          <span className="text-red-600">The units defeated each other!</span>
        </p>
      );
    },
    // idx: 1 -- only friendlyUnit survives
    (event: PostCombatEvent) => {
      return (
        <p>
          <span className="text-green-600">
            {event.data.friendly.randomName} defeats{" "}
            {event.data.enemy.randomName}!
          </span>
        </p>
      );
    },
    // idx: 2 -- only enemyUnit survives
    (event: PostCombatEvent) => {
      return (
        <p>
          <span className="text-red-600">
            {event.data.friendly.randomName} was defeated by{" "}
            {event.data.enemy.randomName}.
          </span>
        </p>
      );
    },
    // idx: 3 -- both units survive
    (event: PostCombatEvent) => {
      return (
        <p>
          <span className="text-amber-600">
            Both units survive and return to their armies.
          </span>
        </p>
      );
    },
  ],
  summary: [
    // idx: 0 -- both armies defeated
    (event: SummaryEvent) => {
      return (
        <p>
          <span className="font-semibold text-red-600">
            The armies defeated each other!
          </span>
        </p>
      );
    },
    // idx: 1 -- only friendly army survives
    (event: SummaryEvent) => {
      return (
        <p>
          <span className="font-semibold text-green-400">
            You defeated the enemy, but their army is already regrouping. Time
            to plan for the next wave!
          </span>
        </p>
      );
    },
    // idx: 2 -- only enemy army survives
    (event: SummaryEvent) => {
      return (
        <p>
          <span className="font-semibold text-red-600">
            The enemy was too strong, and your army was defeated. Buildings were
            damaged!
          </span>
        </p>
      );
    },
  ],
  noArmy: [
    // idx: 0 --  you had no army to begin with
    (event: NoArmyEvent) => {
      return (
        <p>
          <span className="font-semibold text-red-600">
            With no army to fight the enemy, you had no chance. Buildings were
            damaged!
          </span>
        </p>
      );
    },
  ],
};

// TODO: Update this draft into useable object
export const scoutMessages = {
  noScouts: [
    // different indexes used for desired events/text
    // @ts-ignore
    (event: NoScoutEvent) => {
      return (
        // stuff, paragraphs etc
        <></>
      );
    },

    /* more alternatives here */
  ],
};

// template for this kind of message system:
export const messagesObjectName = {
  messageType: [
    // @ts-ignore
    (infoToSend: TypeScriptType) => {
      return <p>Message content to save to state</p>;
    },
  ],
};

// For example, you can call on this using something like messagesObjectName.messageType[0](infoObject).
// You can save this to a separate state object.
// That state object will then hold a message containing appropriately formatted stuff based on your argument.
// Pretty slick. Thanks Devin!
