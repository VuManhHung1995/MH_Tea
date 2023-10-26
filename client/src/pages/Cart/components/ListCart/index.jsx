import { Box, Checkbox } from "@mui/material";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import { useDispatch, useSelector } from "react-redux";
import Cart from "../Cart";
import { useState } from "react";
import { useEffect } from "react";
import cartSlice from "../../cartSlice";

export default function ListCart() {
  const dispatch = useDispatch();
  const carts = useSelector((state) => state.carts.cart);
  // thong tin nhung cart dang checked
  const [checkBoxs, setCheckBoxs] = useState([]);
  // trang thai checked cua checkbox header cua table
  const [checked, setChecked] = useState(false);

  // xu ly hien thi checkbox o header cua table dua vao thong tin tat ca cac checkbox o cac cart
  useEffect(() => {
    if (carts.length === checkBoxs.length) {
      setChecked(true);
    } else {
      setChecked(false);
    }
    dispatch(cartSlice.actions.updateStatusCheckbox(checkBoxs));
  }, [checkBoxs]);

  // xu li khi click vao checkbox header cua table
  const handleChangeCheckBox = () => {
    if (checked) {
      setCheckBoxs([]);
    } else {
      const newState = carts.map((cart) => cart.cartCode);
      setCheckBoxs(newState);
    }
  };

  return (
    <TableContainer>
      <Table sx={{ minWidth: 650 }} aria-label="caption table">
        <TableHead>
          <TableRow>
            <TableCell>
              <Checkbox checked={checked} onChange={handleChangeCheckBox} />
            </TableCell>
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
              Price
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
            <TableCell
              sx={{ fontWeight: 600, fontSize: "12px" }}
              align="center"
            >
              Option
            </TableCell>
          </TableRow>
        </TableHead>
        {carts.length > 0 ? (
          <TableBody>
            {carts.map((row) => (
              <Cart
                row={row}
                key={row.cartCode}
                setCheckBoxs={setCheckBoxs}
                checkBoxs={checkBoxs}
                lengthListCheckBox={carts.length}
              />
            ))}
          </TableBody>
        ) : (
          <></>
        )}
      </Table>
      {carts.length > 0 ? (
        <></>
      ) : (
        <Box sx={{ width: "100%", textAlign: "center" }}>
          <Box
            component="img"
            src="https://bepharco.com/no-products-found.png"
          ></Box>
        </Box>
      )}
    </TableContainer>
  );
}
