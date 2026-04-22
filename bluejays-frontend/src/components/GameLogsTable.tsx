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
import type { HitterGameLog, PitcherGameLog } from "../types/mlb";
import { useTeams } from "../hooks/useTeams";
import { findTeamById } from "../helpers";

interface GameLogsTableProps {
  columns: { field: string; header: string }[];
  data: HitterGameLog[] | PitcherGameLog[];
}

function GameLogsTable({ columns, data }: GameLogsTableProps) {
  const teamsData = useTeams();

  return (
    <TableContainer component={Paper}>
      <Table size="small">
        <TableHead>
          <TableRow sx={{ backgroundColor: "primary.main" }}>
            {columns.map((col) => (
              <TableCell
                key={col.field}
                align={
                  col.field === "date" ||
                  col.field === "opponent" ||
                  col.field === "summary"
                    ? "left"
                    : "right"
                }
                sx={{
                  color: "white",
                  width:
                    col.field === "opponent" || col.field === "summary"
                      ? "200px"
                      : "auto",
                  minWidth:
                    col.field === "opponent" || col.field === "summary"
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
          {data.map((row: HitterGameLog | PitcherGameLog) => (
            <TableRow key={row.date}>
              {columns.map((col) => (
                <TableCell
                  key={col.field}
                  align={
                    col.field === "date" ||
                    col.field === "opponent" ||
                    col.field === "summary"
                      ? "left"
                      : "right"
                  }
                  sx={{
                    width:
                      col.field === "opponent" || col.field === "summary"
                        ? "200px"
                        : "auto",
                    minWidth:
                      col.field === "opponent" || col.field === "summary"
                        ? "200px"
                        : "auto",
                  }}
                >
                  {col.field === "opponent" ? (
                    <Box sx={{ display: "flex", alignItems: "center" }}>
                        <img
                          src={row.opponentLogo}
                          alt={`Logo for ${row.opponentId}`}
                          style={{ width: 24, height: 24, marginRight: 8 }}
                        />
                      {findTeamById(teamsData, row.opponentId).team.abbreviation}
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

export default GameLogsTable;
