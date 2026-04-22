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

export interface BasePlayer {
  id: number;
  firstName: string;
  lastName: string;
  age: number;
  batsAndThrows: string;
  position: string;
  teamName: string;
  height: string;
  weight: number;
  mlbDebutDate: string;
  headshot: string;
}

export interface HitterGameLog {
  date: string;
  opponentId: number;
  opponentLogo: string;
  summary: string;

  plateAppearances: number;
  hits: number;
  rbi: number;
  runs: number;

  doubles: number;
  triples: number;
  homeRuns: number;

  stolenBases: number;
  caughtStealing: number;

  intentionalWalks: number;
  hitByPitch: number;
}

export interface PitcherGameLog {
  date: string;
  opponentId: number;
  opponentLogo: string;
  summary: string;

  battersFaced: number;
  numberOfPitches: number;

  hits: number;
  doubles: number;
  triples: number;
  homeRuns: number;

  intentionalWalks: number;
  hitByPitch: number;
  wildPitches: number;

  avg: string;
}

export type Year = string | null;

export interface HitterYearlyStats {
  year: Year;

  teamId: number | null;
  teamLogo: string | null;
  teamName: string;

  gamesPlayed: number;
  plateAppearances: number;

  hits: number;
  runs: number;
  rbi: number;

  doubles: number;
  triples: number;
  homeRuns: number;

  avg: string;
  obp: string;
  slg: string;
  ops: string;
  babip: string;

  strikeOuts: number;
  strikeOutsPercentage: string;

  baseOnBalls: number;
  baseOnBallsPercentage: string;

  stolenBases: number;
  caughtStealing: number;
}

export interface PitcherYearlyStats {
  year: Year;

  teamId: number | null;
  teamLogo: string | null;
  teamName: string;

  gamesPitched: number;
  inningsPitched: string;

  wins: number;
  losses: number;

  era: string;
  whip: string;

  hits: number;
  homeRuns: number;
  hitByPitch: number;

  strikeOuts: number;
  strikeOutsPercentage: string;

  baseOnBalls: number;
  baseOnBallsPercentage: string;

  battersFaced: number;
  strikeoutsPer9Inn: string;

  avg: string;
}

export interface Hitter extends BasePlayer {
  gamelogs: HitterGameLog[];
  yearlyStats: HitterYearlyStats[];
}

export interface Pitcher extends BasePlayer {
  gamelogs: PitcherGameLog[];
  yearlyStats: PitcherYearlyStats[];
}
