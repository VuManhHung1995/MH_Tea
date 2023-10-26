import AddIcon from "@mui/icons-material/Add";
import DeleteIcon from "@mui/icons-material/Delete";
import RemoveIcon from "@mui/icons-material/Remove";
import { Box, Checkbox, TableCell, TableRow } from "@mui/material";
import { useSnackbar } from "notistack";
import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import {
  deleteOneCart,
  updateQuantityOneCart,
  updateTotalPrice,
} from "../../../../api/cartApi";
import {
  getListProductTopping,
  getListProductToppingOfCart,
} from "../../../../api/productApi";
import { convertBufferToBase64 } from "../../../../common-function/getBase64";
import cartSlice from "../../cartSlice";
import ToppingChip from "../ToppingChip";

function Cart({ row, setCheckBoxs, checkBoxs, lengthListCheckBox }) {
  //   topping trong tung san pham cua gio hang
  const [toppings, setToppings] = useState([]);
  //   thong tin danh sach topping trong database
  const [toppingMaster, setToppingMaster] = useState([]);
  // so luong san pham
  const [quantity, setQuantity] = useState(row.total);
  // tong tien tam tinh cua san pham
  const [total, setTotal] = useState(0);
  // thong tin topping theo tung san pham
  const [toppingDetail, setToppingDetail] = useState(null);
  // Trang thai checkbox
  const [checked, setCheked] = useState(false);

  const { enqueueSnackbar } = useSnackbar();

  const dispatch = useDispatch();
  // lay thong tin cua topping trong gio hang va thong tin topping master trong database
  useEffect(() => {
    async function fetchData() {
      // You can await here
      const listToppping = await getListProductToppingOfCart(row?.userCode);
      const toppingMaster = await getListProductTopping();
      setToppings(listToppping);
      setToppingMaster(toppingMaster);
    }
    fetchData();
  }, [row]);
  // tinh toan tong tien san pham
  useEffect(() => {
    const toppingPrice = toppingDetail?.reduce(
      (accumulator, currentValue) =>
        accumulator + currentValue.productToppingPrice,
      0
    );
    setTotal((row.price + row.productSizePrice + toppingPrice) * quantity);
  }, [quantity, row.price, row.productSizePrice, toppingDetail]);

  // luu thong tin tong tien cua san pham len redux va database
  useEffect(() => {
    dispatch(
      cartSlice.actions.accumulatorPrice({
        totalPrice: total,
        cartCode: row.cartCode,
      })
    );
    // Luu thong tin gia vao database
    (async () => {
      await updateTotalPrice(row.cartCode, total);
    })();
  }, [total]);
  // lay thong tin cua topping theo tung product
  useEffect(() => {
    const toppingsByCart = toppings.filter(
      (topping) => topping.cartCode === row.cartCode
    );
    const toppingOfProduct = toppingsByCart.map((topping) => {
      return toppingMaster.find(
        (item) => item.productToppingId === topping.productToppingId
      );
    });
    setToppingDetail(toppingOfProduct);
  }, [row.cartCode, toppingMaster, toppings]);

  // Hien thi trang thai cua checkbox dua vao trang thai cua checkbox cua header
  useEffect(() => {
    if (checkBoxs.length === 0) {
      setCheked(false);
    }
    if (checkBoxs.length === lengthListCheckBox) {
      setCheked(true);
    }
  }, [checkBoxs]);

  const deleteCart = async () => {
    // xoa du lieu cart trong redux
    dispatch(cartSlice.actions.deleteCart(row.cartCode));
    // Xoa du lieu cart trong DB
    const response = await deleteOneCart(row.cartCode);
    if (response.data.status === 200) {
      enqueueSnackbar(response.data.userMsg, {
        variant: "success",
        autoHideDuration: 2000,
        anchorOrigin: { vertical: "top", horizontal: "right" },
      });
    } else {
      enqueueSnackbar("delete failed", {
        variant: "error",
        autoHideDuration: 2000,
        anchorOrigin: { vertical: "top", horizontal: "right" },
      });
    }
  };

  const updateQuantity = async (quantity, cartCode) => {
    try {
      // cap nhat so luong san pham cua cart len redux
      dispatch(cartSlice.actions.updateQuantity({ cartCode, quantity }));
      // cap nhat du lieu so luong trong database
      await updateQuantityOneCart(cartCode, quantity);
    } catch (error) {
      console.log(error);
    }
  };

  const handleDescreaseQuantity = () => {
    if (quantity > 1) {
      setQuantity((quantity) => {
        return quantity - 1;
      });
      updateQuantity(quantity - 1, row.cartCode);
    }
  };
  const handleIncreaseQuantity = () => {
    setQuantity((quantity) => {
      return quantity + 1;
    });
    updateQuantity(quantity + 1, row.cartCode);
  };
  // xu li khi click vao checkbox
  const handleChangeCheckBox = (cartCode) => {
    setCheked((checked) => !checked);
    console.log(cartCode, checked);
    if (checked) {
      setCheckBoxs((state) => {
        const newState = state.filter((item) => item !== cartCode);
        return newState;
      });
    } else {
      setCheckBoxs((state) => [...state, cartCode]);
    }
  };
  return (
    <TableRow key={row.cartCode}>
      <TableCell>
        <Checkbox
          checked={checked}
          onChange={() => handleChangeCheckBox(row.cartCode)}
        />
      </TableCell>
      <TableCell>
        <Box sx={{ display: "flex", alignItems: "center" }}>
          <Box
            component="img"
            src={convertBufferToBase64(row.srcImage)}
            alt=""
            sx={{ width: "50px", borderRadius: "16px" }}
          />
          <Box component="span" sx={{ ml: "20px" }}>
            {row.productName}
          </Box>
        </Box>
      </TableCell>
      <TableCell align="center">{row.productSizeName}</TableCell>
      <TableCell align="center">
        {new Intl.NumberFormat("vi-VN", {
          style: "currency",
          currency: "VND",
        }).format(row.price + row.productSizePrice)}
      </TableCell>
      <TableCell align="center">
        <Box
          sx={{
            display: "flex",
            alignContent: "center",
            justifyContent: "center",
          }}
        >
          <RemoveIcon
            onClick={handleDescreaseQuantity}
            sx={{
              "&:hover": {
                color: "rgba(0, 167, 111)",
                cursor: "pointer",
              },
            }}
          />
          <Box component="span" sx={{ lineHeight: "21px", m: "0px 8px" }}>
            {quantity}
          </Box>
          <AddIcon
            onClick={handleIncreaseQuantity}
            sx={{
              "&:hover": {
                color: "rgba(0, 167, 111)",
                cursor: "pointer",
              },
            }}
          />
        </Box>
      </TableCell>
      <TableCell align="center">
        <ToppingChip
          toppingDetail={toppingDetail}
          cartCode={row.cartCode}
          setToppingDetail={setToppingDetail}
        />
      </TableCell>
      <TableCell align="center">
        {new Intl.NumberFormat("vi-VN", {
          style: "currency",
          currency: "VND",
        }).format(total)}
      </TableCell>
      <TableCell align="center">
        <DeleteIcon
          onClick={deleteCart}
          sx={{
            "&:hover": {
              color: "rgba(0, 167, 111)",
              cursor: "pointer",
            },
          }}
        />
      </TableCell>
    </TableRow>
  );
}

export default Cart;
