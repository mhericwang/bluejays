import { useEffect, useState } from "react";
import {
  Box,
  Card,
  CardContent,
  CardMedia,
  Link,
  Typography,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import { fetchStatLeaders } from "../api/api";
import type { StatLeadersResponse } from "../types/mlb";


const categories = [
  { key: "homeRuns", label: "Home Runs" },
  { key: "onBasePlusSlugging", label: "OPS" },
  { key: "strikeouts", label: "Strikeouts" },
  { key: "earnedRunAverage", label: "ERA" },
];

interface StatLeadersProps {
  teamId?: number;
}

function StatLeaders({ teamId }: StatLeadersProps) {
  const [leaders, setLeaders] = useState<StatLeadersResponse | null>(null);
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    const loadLeaders = async () => {
      try {
        const response = await fetchStatLeaders(teamId);
        setLeaders(response);
      } catch (err) {
        setError("Unable to load stat leaders.");
        console.error(err);
      }
    };
    loadLeaders();
  }, [teamId]);

  return (
    <Box sx={{ mb: 4 }}>
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          mb: 2,
        }}
      >
        <Typography variant="h4" sx={{ fontWeight: 700, fontSize: 24 }}>
          League Leaders
        </Typography>
        <Link
          underline="none"
          sx={{ fontWeight: 600, color: "primary.main", cursor: "pointer" }}
          onClick={() => navigate("/leaders")}
        >
          View All →
        </Link>
      </Box>
      <Box
        sx={{
          display: "flex",
          flexDirection: { xs: "column", lg: "row" },
          overflowX: "auto",
          justifyContent: "center",
          gap: 4,
          pb: 1,
          px: 1,
          "&::-webkit-scrollbar": {
            height: 10,
          },
          "&::-webkit-scrollbar-track": {
            backgroundColor: "transparent",
          },
          "&::-webkit-scrollbar-thumb": {
            backgroundColor: "rgba(100, 116, 139, 0.4)",
            borderRadius: 5,
          },
        }}
      >
        {error ? (
          <Typography color="error">{error}</Typography>
        ) : !leaders ? (
          <Typography>Loading leaders…</Typography>
        ) : (
          categories.map(({ key, label }) => {
            const leader = leaders[key]?.[0];
            if (!leader) return null;
            return (
              <Card
                key={key}
                sx={{
                  flex: 1,
                  minWidth: 200,
                  backgroundColor: "#1f3756",
                  color: "common.white",
                  border: "1px solid rgba(255,255,255,0.08)",
                }}
              >
                <Box sx={{ px: 2, py: 1, backgroundColor: "primary.main" }}>
                  <Typography
                    variant="h6"
                    sx={{ color: "white", fontWeight: 700 }}
                  >
                    {label}
                  </Typography>
                </Box>
                <CardContent sx={{ px: 2, py: 2, pb: 2 }}>
                  <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
                    <CardMedia
                      component="img"
                      image={leader.headshot}
                      alt={leader.name}
                      sx={{
                        width: 56,
                        height: 56,
                        borderRadius: "50%",
                        objectFit: "cover",
                        backgroundColor: "#ffffff",
                      }}
                    />
                    <Box sx={{ flex: 1, minWidth: 0 }}>
                      <Typography
                        variant="subtitle1"
                        sx={{ fontWeight: 700, color: "common.white", mb: 0.5 }}
                      >
                        {leader.name}
                      </Typography>
                      <Typography
                        variant="body2"
                        sx={{ color: "rgba(255,255,255,0.72)" }}
                      >
                        {leader.team}
                      </Typography>
                    </Box>
                    <Typography
                      variant="h5"
                      sx={{ fontWeight: 700, color: "#fff" }}
                    >
                      {leader.value}
                    </Typography>
                  </Box>
                </CardContent>
              </Card>
            );
          })
        )}
      </Box>
    </Box>
  );
}

export default StatLeaders;
