import React from "react";
import { Resources } from "../types/Resources";
import Villager from "./Villager";

interface DisplayVillagersProps {
  resources: Resources;
  setResources: any;
}

export default function DisplayVillagers(props: DisplayVillagersProps) {
  return (
    <div className="workers">
      <div style={{ fontWeight: "bold" }}>Workers</div>
      <Villager
        name="🪓 Woodcutters"
        workerType="woodcutters"
        resources={props.resources}
        setResources={props.setResources}
      />
      <Villager
        name="⚒️ Stonemasons"
        workerType="stonemasons"
        resources={props.resources}
        setResources={props.setResources}
      />
      <Villager
        name="🥽 Metalworkers"
        workerType="metalworkers"
        resources={props.resources}
        setResources={props.setResources}
      />
    </div>
  );
}
