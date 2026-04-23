import type { StandingsByDivision, Team } from "./types/mlb";

export function findTeamById(
  standings: StandingsByDivision,
  teamId: number,
): { team: Team; division: string } | null {
  for (const [division, teams] of Object.entries(standings)) {
    const team = teams.find((t) => t.team === teamId);
    if (team) {
      return { team, division };
    }
  }
  return { team: null, division: "" };
}

export function formatRanking(rank: string): string {
  if (rank === "1") return "1st";
  if (rank === "2") return "2nd";
  if (rank === "3") return "3rd";
  return `${rank}th`;
}
