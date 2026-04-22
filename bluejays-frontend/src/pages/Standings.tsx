import { Box, Grid, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import { fetchStandings } from "../api/api";
import StandingsTable from "../components/StandingsTable";

interface StandingsProps {
  simplified?: boolean;
}

interface StandingsRow {
  team: number;
  wins: number;
  losses: number;
  winningPercentage: string;
  gamesBack: string;
  lastTen: string;
  runDifferential: number;
  home?: string;
  away?: string;
  oneRun?: string;
  extraInning?: string;
  [key: string]: string | number | undefined;
}

type StandingsByDivision = Record<string, StandingsRow[]>;

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
  const [data, setData] = useState<StandingsByDivision | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchStandings()
      .then(setData)
      .catch(console.error)
      .finally(() => setLoading(false));
  }, []);

  if (loading) return <Typography>Loading...</Typography>;

  if (!data) return <Typography>No standings available.</Typography>;

  return (
    <Box>
      <Typography variant="h4" sx={{ mb: 1, fontWeight: 500, fontSize: 24 }}>
        Standings
      </Typography>
      <Grid container spacing={4}>
        {Object.entries(data).map(([division, teams]) => (
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
