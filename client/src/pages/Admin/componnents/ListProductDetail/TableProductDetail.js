import {
  Box,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
} from "@mui/material";
import { convertBufferToBase64 } from "../../../../common-function/getBase64";
import ToppingChipOrder from "../ToppingChipOrder";
import { useSelector } from "react-redux";

function TableProductDetail({ orderDetails }) {
  const user = useSelector((state) => state.users.currentUser);
  return (
    <Box sx={{ bgcolor: user.role === 1 ? "#f4f6f8" : "", p: "10px 0" }}>
      <Table sx={{ minWidth: 650 }} aria-label="caption table">
        <TableHead>
          <TableRow>
            <TableCell sx={{ fontWeight: 600, fontSize: "12px" }}>
              Item
            </TableCell>
            <TableCell
              sx={{ fontWeight: 600, fontSize: "12px" }}
              align="center"
            >
              Size
            </TableCell>
            <TableCell
              sx={{ fontWeight: 600, fontSize: "12px" }}
              align="center"
            >
              Quanity
            </TableCell>
            <TableCell
              sx={{ fontWeight: 600, fontSize: "12px" }}
              align="center"
            >
              Topping
            </TableCell>
            <TableCell
              sx={{ fontWeight: 600, fontSize: "12px" }}
              align="center"
            >
              Total
            </TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {orderDetails.map((item) => (
            <TableRow key={item.orderCode}>
              <TableCell>
                <Box sx={{ display: "flex", alignItems: "center" }}>
                  <Box
                    component="img"
                    src={convertBufferToBase64(item.srcImage)}
                    alt=""
                    sx={{ width: "50px", borderRadius: "16px" }}
                  />
                  <Box component="span" sx={{ ml: "20px" }}>
                    {item.productName}
                  </Box>
                </Box>
              </TableCell>
              <TableCell align="center">{item.productSizeName}</TableCell>
              <TableCell align="center">
                <Box component="span" sx={{ lineHeight: "21px", m: "0px 8px" }}>
                  {item.total}
                </Box>
              </TableCell>
              <TableCell align="center" sx={{ maxWidth: "180px" }}>
                <ToppingChipOrder orderDetailCode={item.orderDetailCode} />
              </TableCell>
              <TableCell align="center">
                {new Intl.NumberFormat("vi-VN", {
                  style: "currency",
                  currency: "VND",
                }).format(user.role === 1 ? item.totalPrice : item.totals)}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </Box>
  );
}

export default TableProductDetail;
