import { UnitCreationProps } from "../types/UnitCreationProps";
import TrainUnits from "./TrainUnits";

export default function UnitCreation({
  unitCosts,
  freeworkers,
  setFreeworkers,
  woodCollected,
  stoneCollected,
  metalCollected,
  setWoodCollected,
  setStoneCollected,
  setMetalCollected,
  meleeInTraining,
  pewpewInTraining,
  tankyInTraining,
  setMeleeInTraining,
  setPewpewInTraining,
  setTankyInTraining,
}: UnitCreationProps) {
  /* TODO: Make TrainUnits stuff work (haven't worked on props) */

  return (
    <div>
      <h2 className="text-4xl font-extrabold dark:text-white">Unit Creation</h2>
      <TrainUnits
        name="🗡️ Melee"
        freeworkerName={
          unitCosts.melee.freeworkerCost > 1 ? "villagers" : "villager"
        }
        freeworkers={freeworkers}
        setFreeworkers={setFreeworkers}
        freeworkerCost={unitCosts.melee.freeworkerCost}
        resource1Name="wood"
        resource1={woodCollected}
        setResource1={setWoodCollected}
        resource1Cost={unitCosts.melee.woodCost}
        resource2Name="stone"
        resource2={stoneCollected}
        setResource2={setStoneCollected}
        resource2Cost={unitCosts.melee.stoneCost}
        unitInTraining={meleeInTraining}
        setUnitInTraining={setMeleeInTraining}
      />
      <TrainUnits
        name="🏹 Pewpew"
        freeworkerName={
          unitCosts.pewpew.freeworkerCost > 1 ? "villagers" : "villager"
        }
        freeworkers={freeworkers}
        setFreeworkers={setFreeworkers}
        freeworkerCost={unitCosts.pewpew.freeworkerCost}
        resource1Name="wood"
        resource1={woodCollected}
        setResource1={setWoodCollected}
        resource1Cost={unitCosts.pewpew.woodCost}
        resource2Name="metal"
        resource2={metalCollected}
        setResource2={setMetalCollected}
        resource2Cost={unitCosts.pewpew.metalCost}
        unitInTraining={pewpewInTraining}
        setUnitInTraining={setPewpewInTraining}
      />
      <TrainUnits
        name="🛡️ Tanky"
        freeworkerName={
          unitCosts.tanky.freeworkerCost > 1 ? "villagers" : "villager"
        }
        freeworkers={freeworkers}
        setFreeworkers={setFreeworkers}
        freeworkerCost={unitCosts.tanky.freeworkerCost}
        resource1Name="stone"
        resource1={stoneCollected}
        setResource1={setStoneCollected}
        resource1Cost={unitCosts.tanky.stoneCost}
        resource2Name="metal"
        resource2={metalCollected}
        setResource2={setMetalCollected}
        resource2Cost={unitCosts.tanky.metalCost}
        unitInTraining={tankyInTraining}
        setUnitInTraining={setTankyInTraining}
      />
    </div>
  );
}
