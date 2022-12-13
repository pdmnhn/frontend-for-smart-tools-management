import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { ToolAttributes } from "../types";

const ToolsTable = ({ rows }: { rows: ToolAttributes[] }) => {
  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell>Tool</TableCell>
            <TableCell>Brand</TableCell>
            <TableCell>Subtype</TableCell>
            <TableCell>Category</TableCell>
            <TableCell>Last Scan</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row) => (
            <TableRow
              key={row.tool_code}
              sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
            >
              <TableCell component="th" scope="row">
                {row.tooltype_name}
              </TableCell>
              <TableCell>{row.brand_name}</TableCell>
              <TableCell>{row.subtype_name}</TableCell>
              <TableCell>{row.category_name}</TableCell>
              <TableCell>
                {new Date(row.last_scan.replace(" ", "T")).toLocaleDateString()}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default ToolsTable;
