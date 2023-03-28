export interface Matchups {
  onlyTheFriendlyHitsFirst: boolean;
  onlyTheEnemyHitsFirst: boolean;
  unitsHitSimultaneously: boolean;
}

export interface MatchupResults {
  enemyDied: boolean;
  friendlyDied: boolean;
}
