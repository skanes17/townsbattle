import { Unit } from "../types";

export function ScoutReport(
  friendlyArmy: Unit[],
  friendlyPowerLevel: number,
  enemyArmy: Unit[],
  enemyPowerLevel: number,
  enemyUnitTypes: number
) {
  const enemyIsTwiceAsLarge = enemyArmy.length > 2 * friendlyArmy.length;
  const enemyIsApproxSameSize =
    Math.abs(enemyArmy.length - friendlyArmy.length) <
    0.1 * friendlyArmy.length;
  const enemyIsHalfSize = enemyArmy.length < 0.5 * friendlyArmy.length;
  const enemyIsTwiceAsPowerful = enemyPowerLevel > friendlyPowerLevel * 2;
  const enemyIsApproxSamePower =
    Math.abs(enemyPowerLevel - friendlyPowerLevel) < 0.1 * friendlyPowerLevel;
  const enemyIsHalfPowerful = enemyPowerLevel < 0.5 * friendlyPowerLevel;

  /* TODO: Add Nested if statements */
  if (enemyIsTwiceAsLarge) {
    return (
      <div>
        Watch out! The enemy army is twice as large as our friendly army!
      </div>
    );
  } else if (enemyIsApproxSameSize) {
    return <div>The enemy army is about the same size as ours.</div>;
  } else if (enemyIsHalfSize) {
    return (
      <div>
        The enemy army is much smaller than ours. We have the advantage!
      </div>
    );
  } else if (enemyIsTwiceAsPowerful) {
    return <div>Danger! The enemy army is much more powerful than ours!</div>;
  } else if (enemyIsApproxSamePower) {
    return <div>The enemy army has a similar power level to ours.</div>;
  } else if (enemyIsHalfPowerful) {
    return (
      <div>
        Our army is much more powerful than the enemy. We have the upper hand!
      </div>
    );
  } else {
    return (
      <div>
        Something went wrong with the army comparison. Please check your input.
      </div>
    );
  }
}

/* Use a combo of the below to check; also check edge cases where they're equal
function ArmyComparison({ friendlyArmy, enemyArmy }) {
  const enemyIsTwiceAsPowerful = enemyArmy > friendlyArmy * 2;
  const enemyIsApproxSamePower = Math.abs(enemyArmy - friendlyArmy) < 0.1 * friendlyArmy;
  const enemyIsHalfPowerful = enemyArmy < 0.5 * friendlyArmy;

  if (enemyIsTwiceAsPowerful) {
    if (enemyArmy > 2 * friendlyArmy) {
      return <div>Danger! The enemy army is twice as powerful and twice as large as ours!</div>;
    } else if (Math.abs(enemyArmy - friendlyArmy) < 0.1 * friendlyArmy) {
      return <div>The enemy army is twice as powerful but about the same size as ours.</div>;
    } else if (enemyArmy < 0.5 * friendlyArmy) {
      return <div>The enemy army is twice as powerful but only half as large as ours. We have the advantage!</div>;
    }
  } else if (enemyIsApproxSamePower) {
    if (enemyArmy > 2 * friendlyArmy) {
      return <div>The enemy army is about the same size as ours, but twice as powerful. Beware!</div>;
    } else if (Math.abs(enemyArmy - friendlyArmy) < 0.1 * friendlyArmy) {
      return <div>The enemy army is about the same size and has a similar power level to ours.</div>;
    } else if (enemyArmy < 0.5 * friendlyArmy) {
      return <div>The enemy army is about the same size but only half as large as ours. We have the upper hand!</div>;
    }
  } else if (enemyIsHalfPowerful) {
    if (enemyArmy > 2 * friendlyArmy) {
      return <div>The enemy army is much smaller than ours, but twice as powerful. We must be careful!</div>;
    } else if (Math.abs(enemyArmy - friendlyArmy) < 0.1 * friendlyArmy) {
      return <div>The enemy army is much smaller than ours, but has a similar power level to ours. We have a significant advantage!</div>;
    } else if (enemyArmy < 0.5 * friendlyArmy) {
      return <div>The enemy army is much smaller and only half as powerful as ours. We have a decisive advantage!</div>;
    }
  } else {
    return <div>Something went wrong with the army comparison. Please check your input.</div>;
  }
}
 */

/*
const enemyIsTwiceAsLarge = enemyArmy > 2 * friendlyArmy;
const enemyIsApproxSameSize =
  Math.abs(enemyArmy - friendlyArmy) < 0.1 * friendlyArmy;
const enemyIsHalfSize = enemyArmy < 0.5 * friendlyArmy;
const enemyIsTwiceAsPowerful = enemyArmy > friendlyArmy * 2;
const enemyIsApproxSamePower =
  Math.abs(enemyArmy - friendlyArmy) < 0.1 * friendlyArmy;
const enemyIsHalfPowerful = enemyArmy < 0.5 * friendlyArmy;
*/

/* if (friendlyUnits.length < enemyUnits.length && friendlyPowerLevel < powerLevel / 2) {
        alert(
          `Scout's Report on the Enemy --  Unit Count: We're greatly outnumbered, Unit Types: ${enemyUnitTypes}, Threat Level: Critical!, Summary: The enemy has a larger and much more threatening army than ours.`
        );
      } else if ((friendlyUnits.length > enemyUnits.length && friendlyPowerLevel < powerLevel / 2))
      alert(
        `Scout's Report on the Enemy --  Unit Count: We outnumber them! Unit Types: ${enemyUnitTypes}, Threat Level: High, Summary: The enemy has a smaller but more threatening army than ours.`
      )
    } else if (friendlyUnits.length < enemyUnits.length && friendlyPowerLevel < powerLevel){
    alert(
      `Scout's Report on the Enemy --  Unit Count: We're outnumbered! Unit Types: ${enemyUnitTypes}, Threat Level: High, Summary: The enemy has a smaller but more threatening army than ours.`

      `Scout Report: Your army seems to be smaller and less threatening than that of the enemy.`
    )
  }else if (friendlyUnits.length > enemyUnits.length && friendlyPowerLevel < powerLevel){
  alert(
    `Scout Report: Your army seems to be larger than the enemy's, but less threatening!`
  )} 


  else if (friendlyUnits.length < enemyUnits.length && powerLevel < friendlyPowerLevel / 2) {
    alert(
      `Scout Report: The enemy army is currently much more threatening than yours, and has more units!`
    );
  } else if (friendlyUnits.length > enemyUnits.length && powerLevel < friendlyPowerLevel / 2){
  alert(
    `Scout Report: The enemy army is currently smaller than yours, but still seems to be much more threatening!`
  )
} else if (friendlyUnits.length < enemyUnits.length && powerLevel < friendlyPowerLevel){
alert(
  `Scout Report: Your army seems to be smaller and less threatening than that of the enemy.`
)
}else if (friendlyUnits.length > enemyUnits.length && powerLevel < friendlyPowerLevel){
alert(
`Scout Report: Your army seems to be larger than the enemy's, but less threatening!`
)} else  */
