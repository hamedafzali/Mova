import * as React from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import Button from "@mui/material/Button";
const TAX_RATE = 0.07;

function ccyFormat(num) {
  return `${num.toFixed(2)}`;
}

function priceRow(qty, unit) {
  return qty * unit;
}

function createRow(desc, qty, unit) {
  const price = priceRow(qty, unit);
  return { desc, qty, unit, price };
}

function subtotal(items) {
  return items.map(({ price }) => price).reduce((sum, i) => sum + i, 0);
}

const rows = [
  createRow("Paperclips (Box)", 100, 1.15),
  createRow("Paper (Case)", 10, 45.99),
  createRow("Waste Basket", 2, 17.99),
];

export default function SpanningTable({ cart }) {
  const SUM = cart.map((i) => i.item.currentPrice).reduce((a, b) => a + b);
  return (
    <TableContainer component={Paper}>
      <Table
        sx={{
          maxWidth: 700,
          maxHeight: 400,
          border: "1px solid silver",
        }}
        aria-label="spanning table"
        align="center"
      >
        <TableHead>
          <TableRow>
            <TableCell align="center" colSpan={3}>
              Details
            </TableCell>
            <TableCell align="right">Total Price</TableCell>
          </TableRow>
          <TableRow>
            <TableCell>Desc</TableCell>
            <TableCell align="right">Qty.</TableCell>
            <TableCell align="right">Unit</TableCell>
            <TableCell align="right">Sum</TableCell>
          </TableRow>
        </TableHead>
        <TableBody sx={{ overflow: "auto" }}>
          {cart.map((row) => (
            <TableRow key={row.item.displayName}>
              <TableCell>{row.item.displayName}</TableCell>
              <TableCell align="right">{1}</TableCell>
              <TableCell align="right">{row.item.currentPrice}</TableCell>
              <TableCell align="right">
                {ccyFormat(row.item.currentPrice)}
              </TableCell>
            </TableRow>
          ))}

          <TableRow>
            <TableCell rowSpan={3} />
            <TableCell colSpan={2}>Subtotal</TableCell>
            <TableCell align="right">
              {ccyFormat(
                cart.map((i) => i.item.currentPrice).reduce((a, b) => a + b)
              )}
            </TableCell>
          </TableRow>
          <TableRow>
            <TableCell>Tax</TableCell>
            <TableCell align="right">{`${(TAX_RATE * 100).toFixed(
              0
            )} %`}</TableCell>
            <TableCell align="right">{ccyFormat(SUM * TAX_RATE)}</TableCell>
          </TableRow>
          <TableRow>
            <TableCell colSpan={2}>Total</TableCell>
            <TableCell align="right">
              {ccyFormat(SUM * TAX_RATE + SUM)}
            </TableCell>
          </TableRow>
          <TableRow>
            <TableCell align="right">
              <Button variant="contained" color="success">
                Success
              </Button>
            </TableCell>
          </TableRow>
        </TableBody>
      </Table>
    </TableContainer>
  );
}
