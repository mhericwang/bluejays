import { Box, Typography } from "@mui/material";
import { useParams } from "react-router-dom";
import { useTeams } from "../hooks/useTeams";
import { findTeamById, formatRanking } from "../helpers";

function Teams() {
  const { teamId } = useParams<{ teamId: string }>();
  const teamsData = useTeams();
  const { team, division } = findTeamById(teamsData || {}, parseInt(teamId));

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
    </Box>
  );
}

export default Teams;
