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
};

export interface StatLeadersResponse {
  [key: string]: StatLeader[];
};
