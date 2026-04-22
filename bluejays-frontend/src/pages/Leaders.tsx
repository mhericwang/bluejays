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

const categories = [
  { key: "homeRuns", label: "Home Runs" },
  { key: "onBasePlusSlugging", label: "OPS" },
  { key: "strikeouts", label: "Strikeouts" },
  { key: "earnedRunAverage", label: "ERA" },
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
      <Typography variant="h4" sx={{ mb: 4, fontWeight: 700, fontSize: 24 }}>
        League Leaders
      </Typography>
      <Grid container spacing={2}>
        {categories.map(({ key, label }) => (
          <Grid
            key={key}
            size={{ xs: 12, md: 6, xl: 3 }}
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
