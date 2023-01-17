import React from "react";
import {
  PreCombatEvent,
  MainCombatEvent,
  PostCombatEvent,
} from "../../types/CombatEvents";
import POddStyle from "../POddStyle";

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
          attacks{" "}
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
