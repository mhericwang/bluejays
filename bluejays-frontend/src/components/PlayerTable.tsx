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
import type { HitterYearlyStats, PitcherYearlyStats } from "../types/mlb";

interface PlayerTableProps {
  columns: { field: string; header: string }[];
  data: HitterYearlyStats[] | PitcherYearlyStats[];
}

function PlayerTable({ columns, data }: PlayerTableProps) {
  return (
    <TableContainer component={Paper}>
      <Table size="small">
        <TableHead>
          <TableRow sx={{ backgroundColor: "primary.main" }}>
            {columns.map((col) => (
              <TableCell
                key={col.field}
                align={
                  col.field === "year" || col.field === "team"
                    ? "left"
                    : "right"
                }
                sx={{
                  color: "white",
                  width:
                    col.field === "year"
                      ? "60px"
                      : col.field === "team"
                        ? "200px"
                        : "auto",
                  minWidth:
                    col.field === "year"
                      ? "60px"
                      : col.field === "team"
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
          {data.map((row: HitterYearlyStats | PitcherYearlyStats) => (
            <TableRow key={`${row.teamName}-${row.year}`}>
              {columns.map((col) => (
                <TableCell
                  key={col.field}
                  align={
                    col.field === "year" || col.field === "team"
                      ? "left"
                      : "right"
                  }
                  sx={{
                    width:
                      col.field === "year"
                        ? "60px"
                        : col.field === "team"
                          ? "200px"
                          : "auto",
                    minWidth:
                      col.field === "year"
                        ? "60px"
                        : col.field === "team"
                          ? "200px"
                          : "auto",
                  }}
                >
                  {col.field === "team" ? (
                    <Box sx={{ display: "flex", alignItems: "center" }}>
                      {row.teamLogo && (
                        <img
                          src={row.teamLogo}
                          alt={row.teamName}
                          style={{ width: 24, height: 24, marginRight: 8 }}
                        />
                      )}
                      {row.teamName}
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

export default PlayerTable;
