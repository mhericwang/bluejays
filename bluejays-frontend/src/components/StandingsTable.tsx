import Paper from "@mui/material/Paper";
import {
  Box,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";
import type { Team } from "../types/mlb";
import { useNavigate } from "react-router-dom";

interface StandingsTableProps {
  columns: { field: string; header: string }[];
  data: Team[];
  division: string;
}

function StandingsTable({ columns, data, division }: StandingsTableProps) {
  const navigate = useNavigate();

  return (
    <TableContainer component={Paper}>
      <Table size="small">
        <TableHead>
          <TableRow sx={{ backgroundColor: "primary.main" }}>
            {columns.map((col) => (
              <TableCell
                key={col.field}
                align={col.field === "team" ? "left" : "right"}
                sx={{ color: "white" }}
              >
                {col.field === "team" ? division : col.header}
              </TableCell>
            ))}
          </TableRow>
        </TableHead>
        <TableBody>
          {data.map((row) => (
            <TableRow key={row.team} hover sx={{ cursor: "pointer" }} onClick={() => navigate(`/teams/${row.team}`)}>
              {columns.map((col) => (
                <TableCell
                  key={col.field}
                  align={col.field === "team" ? "left" : "right"}
                >
                  {col.field === "team" ? (
                    <Box sx={{ display: "flex", alignItems: "center" }}>
                      <img
                        src={row.logo}
                        alt={row.abbreviation}
                        style={{ width: 24, height: 24, marginRight: 8 }}
                      />
                      {row.abbreviation}
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

export default StandingsTable;
