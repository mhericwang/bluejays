import { Box, Typography } from "@mui/material";
import { useParams } from "react-router-dom";

function Teams() {
  const { teamId } = useParams<{ teamId: string }>();

  return (
    <Box>
      <Typography variant="h4" sx={{ mb: 4, fontWeight: 500, fontSize: 24 }}>
        Team {teamId}
      </Typography>
    </Box>
  );
}

export default Teams;