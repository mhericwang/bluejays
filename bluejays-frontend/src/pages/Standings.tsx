import { Box, Typography } from "@mui/material";
import React from "react";

interface StandingsProps {
  simplified?: boolean;
}

const simplified_columns = [
  { field: "team", header: "" },
  { field: "wins", header: "W" },
  { field: "losses", header: "L" },
  { field: "winningPercentage", header: "PCT" },
  { field: "gamesBack", header: "GB" },
  { field: "lastTen", header: "L10" },
  { field: "runDifferential", header: "DIFF" },
];

const detailed_columns = [
  ...simplified_columns,
  { field: "home", header: "Home" },
  { field: "away", header: "Away" },
  { field: "oneRun", header: "1Run" },
  { field: "extraInning", header: "XInn" },
];

function Standings({ simplified }: StandingsProps) {
  return (
    <Box>
      <Typography variant="h4" sx={{ mb: 4, fontWeight: 500, fontSize: 24 }}>
        Standings
      </Typography>
    </Box>
  );
}

export default Standings;
