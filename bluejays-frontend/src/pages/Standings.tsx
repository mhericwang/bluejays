import { Box, Grid, Typography } from "@mui/material";
import StandingsTable from "../components/StandingsTable";
import { useTeams } from "../hooks/useTeams";

interface StandingsProps {
  simplified?: boolean;
}

const SIMPLIFIED_COLS = [
  { field: "team", header: "" },
  { field: "wins", header: "W" },
  { field: "losses", header: "L" },
  { field: "winningPercentage", header: "PCT" },
  { field: "gamesBack", header: "GB" },
  { field: "lastTen", header: "L10" },
  { field: "runDifferential", header: "DIFF" },
];

const DETAILED_COLS = [
  ...SIMPLIFIED_COLS,
  { field: "home", header: "Home" },
  { field: "away", header: "Away" },
  { field: "oneRun", header: "1Run" },
  { field: "extraInning", header: "XInn" },
];

function Standings({ simplified }: StandingsProps) {
  const teamsData = useTeams()

  if (!teamsData) return <Typography>No standings available.</Typography>;

  return (
    <Box>
      <Typography variant="h4" sx={{ mb: 1, fontWeight: 500, fontSize: 24 }}>
        Standings
      </Typography>
      <Grid container spacing={4}>
        {Object.entries(teamsData).map(([division, teams]) => (
          <Grid
            key={division}
            size={{ md: 6 }}
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <StandingsTable
              key={division}
              columns={simplified ? SIMPLIFIED_COLS : DETAILED_COLS}
              data={teams}
              division={division}
            />
          </Grid>
        ))}
      </Grid>
    </Box>
  );
}

export default Standings;
