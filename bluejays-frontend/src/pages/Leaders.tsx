import { useEffect, useState } from "react";
import { Box, Grid, Typography } from "@mui/material";
import { fetchStatLeaders } from "../api/api";
import StatLeadersTable from "../components/StatLeadersTable";

interface StatLeader {
  player: number;
  rank: string;
  name: string;
  team: string;
  value: string | number;
  headshot: string;
}

interface StatLeadersResponse {
  [key: string]: StatLeader[];
}

const HITTING_CATEGORIES = [
  { key: "homeRuns", label: "Home Runs" },
  { key: "onBasePlusSlugging", label: "OPS" },
  { key: "hits", label: "Hits" },
  { key: "stolenBases", label: "Stolen Bases" },
];

const PITCHING_CATEGORIES = [
  { key: "strikeouts", label: "Strikeouts" },
  { key: "earnedRunAverage", label: "ERA" },
  { key: "wins", label: "Wins" },
  { key: "saves", label: "Saves" },
];

function Leaders() {
  const [leaders, setLeaders] = useState<StatLeadersResponse | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadLeaders = async () => {
      try {
        const response = await fetchStatLeaders();
        setLeaders(response);
      } catch (err) {
        setError("Unable to load stat leaders.");
        console.error(err);
      }
    };
    loadLeaders();
  }, []);

  if (error) {
    return <Typography color="error">{error}</Typography>;
  }

  if (!leaders) {
    return <Typography>Loading leaders…</Typography>;
  }

  return (
    <Box sx={{ mb: 4 }}>
      <Typography variant="h5" sx={{ mb: 2, fontWeight: 700, fontSize: 20 }}>
        Hitting Leaders
      </Typography>
      <Grid container spacing={2}>
        {HITTING_CATEGORIES.map(({ key, label }) => (
          <Grid
            key={key}
            size={{ xs: 12, sm: 6, lg: 3 }}
            sx={{
              display: "flex",
              alignItems: "top",
              justifyContent: "center",
            }}
          >
            <StatLeadersTable leaders={leaders[key] || []} label={label} />
          </Grid>
        ))}
      </Grid>
      <Typography variant="h5" sx={{ mb: 2, mt: 4, fontWeight: 700, fontSize: 20 }}>
        Pitching Leaders
      </Typography>
      <Grid container spacing={2}>
        {PITCHING_CATEGORIES.map(({ key, label }) => (
          <Grid
            key={key}
            size={{ xs: 12, sm: 6, lg: 3 }}
            sx={{
              display: "flex",
              alignItems: "top",
              justifyContent: "center",
            }}
          >
            <StatLeadersTable leaders={leaders[key] || []} label={label} />
          </Grid>
        ))}
      </Grid>
    </Box>
  );
}

export default Leaders;
