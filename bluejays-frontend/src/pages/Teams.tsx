import { Box, Typography } from "@mui/material";
import { useParams } from "react-router-dom";
import { useTeams } from "../hooks/useTeams";
import { findTeamById, formatRanking } from "../helpers";
import TeamRosterTable from "../components/TeamRosterTable";
import { useEffect, useState } from "react";
import type { RosterHitter, RosterPitcher } from "../types/mlb";
import { fetchTeamRoster } from "../api/api";
import News from "../components/News";
import StatLeaders from "../components/StatLeaders";

const HITTER_COLUMNS = [
  { field: "position", header: "Pos" },
  { field: "jerseyNumber", header: "#" },
  { field: "player", header: "Batter" },
  { field: "age", header: "Age" },
  { field: "batSide", header: "B" },
  { field: "pitchSide", header: "T" },
  { field: "plateAppearances", header: "PA" },
  { field: "hits", header: "H" },
  { field: "doubles", header: "2B" },
  { field: "triples", header: "3B" },
  { field: "homeRuns", header: "HR" },
  { field: "stolenBases", header: "SB" },
  { field: "strikeOutsPercentage", header: "SO%" },
  { field: "baseOnBallsPercentage", header: "BB%" },
  { field: "avg", header: "AVG" },
  { field: "obp", header: "OBP" },
  { field: "ops", header: "OPS" },
];

const PITCHER_COLUMNS = [
  { field: "position", header: "Pos" },
  { field: "jerseyNumber", header: "#" },
  { field: "player", header: "Pitcher" },
  { field: "age", header: "Age" },
  { field: "pitchSide", header: "T" },
  { field: "gamesPitched", header: "G" },
  { field: "inningsPitched", header: "IP" },
  { field: "battersFaced", header: "BF" },
  { field: "era", header: "ERA" },
  { field: "strikeOuts", header: "SO" },
  { field: "baseOnBalls", header: "BB" },
  { field: "strikeOutsPercentage", header: "SO%" },
  { field: "baseOnBallsPercentage", header: "BB%" },
  { field: "ops", header: "OPS" },
];

function Teams() {
  const { teamId } = useParams<{ teamId: string }>();
  const teamsData = useTeams();
  const { team, division } = findTeamById(teamsData || {}, parseInt(teamId));
  const [roster, setRoster] = useState<{
    hitters: RosterHitter[];
    pitchers: RosterPitcher[];
  } | null>(null);

  useEffect(() => {
    fetchTeamRoster(parseInt(teamId))
      .then((data) => setRoster(data))
      .catch((err) => console.error("Failed to fetch roster:", err));
  }, [teamId]);

  if (!teamsData) return <Typography>No team data available.</Typography>;

  return (
    <Box>
      <Box
        sx={{
          display: "flex",
          flexDirection: "row",
          alignItems: "center",
          mb: 2,
        }}
      >
        <img
          src={team?.logo}
          alt={team?.abbreviation}
          style={{ width: 48, height: 48, marginRight: 16 }}
        />
        <Box sx={{ display: "flex", flexDirection: "column" }}>
          <Typography variant="h4" sx={{ fontWeight: 700, fontSize: 24 }}>
            {team?.teamName}
          </Typography>
          <Typography variant="subtitle1" sx={{ color: "text.secondary" }}>
            {formatRanking(team?.divisionRank)} in {division} {team?.wins}-
            {team?.losses} ({team?.winningPercentage})
          </Typography>
        </Box>
      </Box>
      <Typography variant="h6" sx={{ mb: 1 }}>
        Hitters
      </Typography>
      <Box sx={{ mb: 4 }}>
        <TeamRosterTable
          columns={HITTER_COLUMNS}
          data={roster?.hitters || []}
        />
        <Typography variant="h6" sx={{ mt: 4, mb: 1 }}>
          Pitchers
        </Typography>
        <TeamRosterTable
          columns={PITCHER_COLUMNS}
          data={roster?.pitchers || []}
        />
        </Box>
      <News teamName={team.teamName} newsName={team?.newsName} />
      <StatLeaders teamId={team.team} teamName={team.teamName} />
    </Box>
  );
}

export default Teams;
