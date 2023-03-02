import React from "react";
import {
  PreCombatEvent,
  MainCombatEvent,
  PostCombatEvent,
  SummaryEvent,
  NoArmyEvent,
} from "../../types";
import POddStyle from "./POddStyle";

/* TODO: Make flavourtexts based on unit type; see below in combat phase */

export const messages = {
  // preCombat, mainCombat, postCombat, summary, noArmy are the types
  preCombat: [
    // different indexes used for desired events/text
    (event: PreCombatEvent) => {
      return (
        <POddStyle>
          <span className="text-green-400">
            {event.data.friendly.name}
            {event.data.friendly.id}
          </span>{" "}
          faces off against{" "}
          <span className="text-red-400">
            {event.data.enemy.name}
            {event.data.enemy.id}
          </span>
          .
        </POddStyle>
      );
    },
    (event: PreCombatEvent) => {
      return (
        <POddStyle>
          <span className="text-green-400">
            {event.data.friendly.name}
            {event.data.friendly.id}
          </span>{" "}
          jumps in and stares down{" "}
          <span className="text-red-400">
            {event.data.enemy.name}
            {event.data.enemy.id}
          </span>
          .
        </POddStyle>
      );
    },
    (event: PreCombatEvent) => {
      return (
        <POddStyle>
          <span className="text-green-400">
            {event.data.friendly.name}
            {event.data.friendly.id}
          </span>{" "}
          wants to try his luck against{" "}
          <span className="text-red-400">
            {event.data.enemy.name}
            {event.data.enemy.id}
          </span>
          .
        </POddStyle>
      );
    },
    (event: PreCombatEvent) => {
      return (
        <POddStyle>
          <span className="text-green-400">
            {event.data.friendly.name}
            {event.data.friendly.id}
          </span>{" "}
          sees{" "}
          <span className="text-red-400">
            {event.data.enemy.name}
            {event.data.enemy.id}
          </span>{" "}
          and calls him something nasty.
        </POddStyle>
      );
    },
    (event: PreCombatEvent) => {
      return (
        <POddStyle>
          <span className="text-green-400">
            {event.data.friendly.name}
            {event.data.friendly.id}
          </span>{" "}
          agrees to battle{" "}
          <span className="text-red-400">
            {event.data.enemy.name}
            {event.data.enemy.id}
          </span>{" "}
          but they're not happy about it.
        </POddStyle>
      );
    },
    /* more alternatives here */
  ],
  combat: [
    (event: MainCombatEvent) => {
      return (
        <POddStyle>
          <span className="text-green-400">
            {event.data.friendly.name}
            {event.data.friendly.id}
          </span>{" "}
          {/* TODO: More of this type of conditional flavortext; focus on DRY */}
          {event.data.friendly.unitType === "farmer" ? "flails at" : null}{" "}
          {event.data.friendly.unitType === "melee" ? "slashes" : null}{" "}
          {event.data.friendly.unitType === "pewpew" ? "shoots at" : null}{" "}
          {event.data.friendly.unitType === "tanky" ? "bashes" : null}{" "}
          {event.data.friendly.unitType === "mage" ? "casts a spell on" : null}{" "}
          <span className="text-red-400">
            {event.data.enemy.name}
            {event.data.enemy.id}
          </span>{" "}
          for{" "}
          <span className="text-amber-400">
            {event.data.friendly.attack} damage
          </span>{" "}
          and takes{" "}
          <span className="text-amber-400">
            {event.data.enemy.attack} damage
          </span>
          .
        </POddStyle>
      );
    },
    (event: MainCombatEvent) => {
      return (
        <POddStyle>
          <span className="text-green-400">
            {event.data.friendly.name}
            {event.data.friendly.id}
          </span>{" "}
          injures{" "}
          <span className="text-red-400">
            {event.data.enemy.name}
            {event.data.enemy.id}
          </span>{" "}
          for{" "}
          <span className="text-amber-400">
            {event.data.friendly.attack} damage,
          </span>{" "}
          then takes{" "}
          <span className="text-amber-400">
            {event.data.enemy.attack} damage
          </span>
          .
        </POddStyle>
      );
    },
    (event: MainCombatEvent) => {
      return (
        <POddStyle>
          <span className="text-green-400">
            {event.data.friendly.name}
            {event.data.friendly.id}
          </span>{" "}
          inflicts{" "}
          <span className="text-amber-400">
            {event.data.friendly.attack} damage
          </span>{" "}
          on{" "}
          <span className="text-red-400">
            {event.data.enemy.name}
            {event.data.enemy.id}
          </span>
          , taking{" "}
          <span className="text-amber-400">
            {event.data.enemy.attack} damage
          </span>{" "}
          in return.
        </POddStyle>
      );
    },
    (event: MainCombatEvent) => {
      return (
        <POddStyle>
          <span className="text-green-400">
            {event.data.friendly.name}
            {event.data.friendly.id}
          </span>{" "}
          does{" "}
          <span className="text-amber-400">
            {event.data.friendly.attack} damage
          </span>{" "}
          to{" "}
          <span className="text-red-400">
            {event.data.enemy.name}
            {event.data.enemy.id}
          </span>{" "}
          and takes{" "}
          <span className="text-amber-400">
            {event.data.enemy.attack} damage
          </span>
          .
        </POddStyle>
      );
    },
  ],
  /* TODO: Include at least one message per possiblity (armies both survive, either one dies, both die). */
  postCombat: [
    // idx: 0 -- both units died
    (event: PostCombatEvent) => {
      return (
        <POddStyle>
          <span className="text-red-600">The units defeated each other!</span>
        </POddStyle>
      );
    },
    // idx: 1 -- only friendlyUnit survives
    (event: PostCombatEvent) => {
      return (
        <POddStyle>
          <span className="text-green-600">
            {event.data.friendly.name}
            {event.data.friendly.id} defeats {event.data.enemy.name}
            {event.data.enemy.id}!
          </span>
        </POddStyle>
      );
    },
    // idx: 2 -- only enemyUnit survives
    (event: PostCombatEvent) => {
      return (
        <POddStyle>
          <span className="text-red-600">
            {event.data.friendly.name}
            {event.data.friendly.id} was defeated by {event.data.enemy.name}
            {event.data.enemy.id}.
          </span>
        </POddStyle>
      );
    },
    // idx: 3 -- both units survive
    (event: PostCombatEvent) => {
      return (
        <POddStyle>
          <span className="text-amber-600">
            Both units survive and return to their armies.
          </span>
        </POddStyle>
      );
    },
  ],
  summary: [
    // idx: 0 -- both armies defeated
    (event: SummaryEvent) => {
      return (
        <POddStyle>
          <span className="font-semibold text-red-600">
            The armies defeated each other!
          </span>
        </POddStyle>
      );
    },
    // idx: 1 -- only friendly army survives
    (event: SummaryEvent) => {
      return (
        <POddStyle>
          <span className="font-semibold text-green-400">
            You defeated the enemy, but their army is already regrouping. Time
            to plan for the next wave!
          </span>
        </POddStyle>
      );
    },
    // idx: 2 -- only enemy army survives
    (event: SummaryEvent) => {
      return (
        <POddStyle>
          <span className="font-semibold text-red-600">
            The enemy was too strong, and your army was defeated. Buildings were
            damaged!
          </span>
        </POddStyle>
      );
    },
  ],
  noArmy: [
    // idx: 0 --  you had no army to begin with
    (event: NoArmyEvent) => {
      return (
        <POddStyle>
          <span className="font-semibold text-red-600">
            With no army to fight the enemy, you had no chance. Buildings were
            damaged!
          </span>
        </POddStyle>
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
