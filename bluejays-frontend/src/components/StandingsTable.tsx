import Paper from "@mui/material/Paper";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";

interface StandingsTableProps {
  columns: { field: string; header: string }[];
  data: Record<string, string | number>[];
  division: string;
}

function StandingsTable({ columns, data, division }: StandingsTableProps) {
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
            <TableRow key={row.name}>
              {columns.map((col) => (
                <TableCell
                  key={col.field}
                  align={col.field === "team" ? "left" : "right"}
                >
                  {row[col.field]}
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
