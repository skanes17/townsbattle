export function calculateTurnsToWaitBeforeCombat(
  minTurns: number,
  maxTurns: number
): number {
  return Math.floor(Math.random() * (maxTurns - minTurns + 1)) + minTurns;
}
