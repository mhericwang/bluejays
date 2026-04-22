import {
  Box,
  CardMedia,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from "@mui/material";
import type { StatLeader } from "../types/mlb";

interface StatLeadersTableProps {
  leaders: StatLeader[];
  label: string;
}

const TABLE_CELL_SX = {
  color: "white",
  fontWeight: 700,
  borderBottom: "1px solid rgba(255,255,255,0.08)",
};

function StatLeadersTable({ leaders, label }: StatLeadersTableProps) {
  return (
    <Box sx={{ mb: 4 }}>
      <Box
        sx={{
          px: 2,
          py: 1,
          backgroundColor: "primary.main",
          borderRadius: "8px 8px 0 0",
        }}
      >
        <Typography variant="h6" sx={{ color: "white", fontWeight: 700 }}>
          {label}
        </Typography>
      </Box>
      <TableContainer component={Box} sx={{ backgroundColor: "#1f3756", borderRadius: "0 0 8px 8px" }}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell sx={TABLE_CELL_SX}>Rank</TableCell>
              <TableCell sx={TABLE_CELL_SX}>Player</TableCell>
              <TableCell sx={TABLE_CELL_SX}>Team</TableCell>
              <TableCell sx={TABLE_CELL_SX}>Value</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {leaders.map((leader, index) => (
              <TableRow key={index}>
                <TableCell sx={TABLE_CELL_SX}>{leader.rank}</TableCell>
                <TableCell
                  sx={{
                    color: "white",
                    borderBottom: "1px solid rgba(255,255,255,0.08)",
                  }}
                >
                  <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
                    <CardMedia
                      component="img"
                      image={leader.headshot}
                      alt={leader.name}
                      sx={{
                        width: 40,
                        height: 40,
                        borderRadius: "50%",
                        objectFit: "cover",
                        backgroundColor: "#ffffff",
                      }}
                    />
                    <Typography variant="body1" sx={{ fontWeight: 700 }}>
                      {leader.name}
                    </Typography>
                  </Box>
                </TableCell>
                <TableCell
                  sx={{
                    color: "rgba(255,255,255,0.72)",
                    borderBottom: "1px solid rgba(255,255,255,0.08)",
                  }}
                >
                  {leader.team}
                </TableCell>
                <TableCell sx={TABLE_CELL_SX}>{leader.value}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
}

export default StatLeadersTable;
