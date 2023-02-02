import React from "react";
import {
  PreCombatEvent,
  MainCombatEvent,
  PostCombatEvent,
} from "../../types/CombatEvents";
import POddStyle from "./POddStyle";

/* TODO: Make flavourtexts based on unit type; see below in combat phase */

export const messages = {
  // preCombat, mainCombat, postCombat are the types
  preCombat: [
    // different indexes used for desired events/text
    (event: PreCombatEvent) => {
      return (
        <>
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
        </>
      );
    },
    (event: PreCombatEvent) => {
      return (
        <>
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
        </>
      );
    },
    (event: PreCombatEvent) => {
      return (
        <>
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
        </>
      );
    },
    (event: PreCombatEvent) => {
      return (
        <>
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
        </>
      );
    },
    (event: PreCombatEvent) => {
      return (
        <>
          <POddStyle>
            <span className="text-green-400">
              {event.data.friendly.name}
              {event.data.friendly.id}
            </span>{" "}
            reluctantly agrees to battle{" "}
            <span className="text-red-400">
              {event.data.enemy.name}
              {event.data.enemy.id}
            </span>{" "}
            but they're not happy about it.
          </POddStyle>
        </>
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
          {event.data.friendly.unitType === "melee" ? "slashes" : null}{" "}
          {event.data.friendly.unitType === "pewpew" ? "shoots at" : null}{" "}
          {event.data.friendly.unitType === "tanky" ? "bashes" : null}{" "}
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
  ],
  postCombat: [
    (event: PostCombatEvent) => {
      return <>Both units survive and return to their armies.</>;
    },
    (event: PostCombatEvent) => {
      return (
        <POddStyle>
          <span className="text-green-400">
            {event.data.friendly.name}
            {event.data.friendly.id}
          </span>{" "}
          returns to their army.
        </POddStyle>
      );
    },
  ],
};
