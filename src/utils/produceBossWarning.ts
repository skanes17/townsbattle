import { Unit } from "../types";

export function produceBossWarning(bossUnit: Unit) {
  const bossWarning =
    bossUnit.scoutWarning ??
    "Also, our scouts seemed shaken upon return. It seems they spotted a powerful enemy. Be careful!";
  return bossWarning;
}
