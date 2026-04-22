export interface Team {
  team: number;
  abbreviation: string;
  newsName: string;
  teamName: string;
  divisionRank: string;
  wins: number;
  losses: number;
  winningPercentage: string;
  gamesBack: string;
  lastTen: string;
  runDifferential: number;
  home: string;
  away: string;
  oneRun: string;
  extraInning: string;
  logo: string;
}

export type StandingsByDivision = Record<string, Team[]>;

export interface StatLeader {
  player: number;
  rank: string;
  name: string;
  team: string;
  value: string | number;
  headshot: string;
}

export interface StatLeadersResponse {
  [key: string]: StatLeader[];
}

interface RosterPlayerCommon {
  id: number;
  firstName: string;
  lastName: string;
  age: number;
  jerseyNumber: string;
  position: string;
  headshot: string;
  gamesPlayed: number;
  numberOfPitches: number;
  strikeOuts: number;
  baseOnBalls: number;
  strikeOutsPercentage: number;
  baseOnBallsPercentage: number;
  hitByPitch: number;
  intentionalWalks: number;
}

export interface RosterHitter extends RosterPlayerCommon {
  batSide: string;
  plateAppearances: number;
  atBats: number;
  hits: number;
  doubles: number;
  triples: number;
  homeRuns: number;
  avg: string;
  obp: string;
  slg: string;
  ops: string;
  rbi: number;
  runs: number;
  stolenBases: number;
  stolenBasePercentage: string;
  caughtStealing: number;
  caughtStealingPercentage: string;
  leftOnBase: number;
  sacBunts: number;
  sacFlies: number;
  catchersInterference: number;
  groundIntoDoublePlay: number;
  totalBases: number;
  atBatsPerHomeRun: string;
  babip: string;
}

export interface RosterPitcher extends RosterPlayerCommon {
  pitchSide: string;
  gamesPitched: number;
  gamesStarted: number;
  gamesFinished: number;
  inningsPitched: string;
  battersFaced: number;
  wins: number;
  losses: number;
  winPercentage: string;
  era: string;
  whip: string;
  earnedRuns: number;
  runs: number;
  strikeoutsPer9Inn: string;
  walksPer9Inn: string;
  hitsPer9Inn: string;
  strikePercentage: string;
  strikeoutWalkRatio: string;
  saves: number;
  saveOpportunities: number;
  blownSaves: number;
  holds: number;
  inheritedRunners: number;
  inheritedRunnersScored: number;
  completeGames: number;
  shutouts: number;
  balks: number;
  wildPitches: number;
  pickoffs: number;
  hitBatsmen: number;
  airOuts: number;
  groundOuts: number;
  groundOutsToAirouts: string;
  atBats: number;
  hits: number;
  totalBases: number;
}

export interface TeamRoster {
  hitters: RosterHitter[];
  pitchers: RosterPitcher[];
}
