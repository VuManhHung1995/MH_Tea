import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import ListProductDetail from "../ListProductDetail";

import { useState } from "react";
import { changeDateToSql } from "../../../../common-function/formatDate";

export default function TableOrder({ listOrder }) {
  const [codeShow, setCodeShow] = useState(null);
  console.log(listOrder);
  const handleShowProductDetail = (orderCode) => {
    codeShow === orderCode ? setCodeShow(null) : setCodeShow(orderCode);
  };
  return (
    <TableContainer component={Paper}>
      <Table
        sx={{ minWidth: 650 }}
        stickyHeader={true}
        aria-label="sticky table"
      >
        <TableHead sx={{ fontWeight: "bold" }}>
          <TableRow>
            <TableCell>Customer</TableCell>
            <TableCell>Date</TableCell>
            <TableCell>Phone</TableCell>
            <TableCell>Items</TableCell>
            <TableCell>Total Price</TableCell>
            <TableCell>Status</TableCell>
            <TableCell sx={{ textAlign: "center" }}>Option</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {listOrder.map((row) => (
            <>
              <TableRow
                key={row.orderCode}
                sx={{
                  "&:last-child td, &:last-child th": { border: 0 },
                  "&:hover": { cursor: "pointer" },
                  bgcolor:
                    codeShow === row.orderCode ? "rgba(0, 167, 111, 0.1)" : "",
                }}
                hover
                onClick={() => handleShowProductDetail(row.orderCode)}
              >
                <TableCell>{row.recevierName}</TableCell>
                <TableCell>
                  {changeDateToSql(new Date(row.createDate))}
                </TableCell>
                <TableCell>{row.phone}</TableCell>
                <TableCell>{row.quantity}</TableCell>
                <TableCell>
                  {new Intl.NumberFormat("vi-VN", {
                    style: "currency",
                    currency: "VND",
                  }).format(row.totals)}
                </TableCell>
                <TableCell
                  sx={{ width: "180px", textAlign: "center" }}
                ></TableCell>
                <TableCell
                  sx={{ width: "180px", textAlign: "center" }}
                ></TableCell>
              </TableRow>
              {codeShow === row.orderCode ? (
                <TableRow>
                  <TableCell colSpan={7}>
                    <ListProductDetail orderCode={row.orderCode} />
                  </TableCell>
                </TableRow>
              ) : (
                ""
              )}
            </>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
