import {
  Box,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";
import type { RosterHitter, RosterPitcher } from "../types/mlb";

interface TeamRosterTableProps {
  columns: { field: string; header: string }[];
  data: RosterHitter[] | RosterPitcher[];
}

function TeamRosterTable({ columns, data }: TeamRosterTableProps) {
  return (
    <TableContainer component={Paper}>
      <Table size="small">
        <TableHead>
          <TableRow sx={{ backgroundColor: "primary.main" }}>
            {columns.map((col) => (
              <TableCell
                key={col.field}
                align={
                  col.field === "position" ||
                  col.field === "jerseyNumber" ||
                  col.field === "player"
                    ? "left"
                    : "right"
                }
                sx={{
                  color: "white",
                  width:
                    col.field === "jerseyNumber"
                      ? "60px"
                      : col.field === "position"
                        ? "80px"
                        : col.field === "player"
                          ? "200px"
                          : "auto",
                  minWidth:
                    col.field === "jerseyNumber"
                      ? "60px"
                      : col.field === "position"
                        ? "80px"
                        : col.field === "player"
                          ? "200px"
                          : "auto",
                }}
              >
                {col.header}
              </TableCell>
            ))}
          </TableRow>
        </TableHead>
        <TableBody>
          {data.map((row: RosterHitter | RosterPitcher) => (
            <TableRow key={row.id}>
              {columns.map((col) => (
                <TableCell
                  key={col.field}
                  align={
                    col.field === "position" ||
                    col.field === "jerseyNumber" ||
                    col.field === "player"
                      ? "left"
                      : "right"
                  }
                  sx={{
                    width:
                      col.field === "jerseyNumber"
                        ? "60px"
                        : col.field === "position"
                          ? "80px"
                          : col.field === "player"
                            ? "200px"
                            : "auto",
                    minWidth:
                      col.field === "jerseyNumber"
                        ? "60px"
                        : col.field === "position"
                          ? "80px"
                          : col.field === "player"
                            ? "200px"
                            : "auto",
                  }}
                >
                  {col.field === "player" ? (
                    <Box sx={{ display: "flex", alignItems: "center" }}>
                      <img
                        src={row.headshot}
                        alt={row.lastName}
                        style={{ width: 24, height: 24, marginRight: 8 }}
                      />
                      {row.firstName} {row.lastName}
                    </Box>
                  ) : (
                    row[col.field]
                  )}
                </TableCell>
              ))}
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}

export default TeamRosterTable;
