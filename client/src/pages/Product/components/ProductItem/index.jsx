import FavoriteIcon from "@mui/icons-material/Favorite";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import { Box, Button, Typography } from "@mui/material";
import { useSnackbar } from "notistack";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { getCartsByUser, registerCart } from "../../../../api/cartApi";
import { getListProductToppingOfCart } from "../../../../api/productApi";
import { verifyUser } from "../../../../common-function/checkUserIsExist";
import cartSlice from "../../../Cart/cartSlice";

function ProductItem({ src, name, price, id }) {
  const navigate = useNavigate();
  const { enqueueSnackbar } = useSnackbar();
  const dispatch = useDispatch();

  const user = useSelector((state) => state.users.currentUser);
  const carts = useSelector((state) => state.carts.cart);

  const handleAddCart = async () => {
    // Kiem tra xem user con dang nhap khong
    const isCheckExistUser = await verifyUser(user.email);
    if (isCheckExistUser) {
      const cart = {
        productCode: id,
        userCode: user.userCode,
        productSizeId: 1,
        listTopping: [],
        total: 1,
        totalPrice: price,
      };
      // kiem tra cart da ton tai chua
      let isExistCart = false;
      // Kiem tra ten san pham va size
      const productOfCart = carts.find((item) => {
        return (
          item.productCode === id &&
          item.userCode === user.userCode &&
          cart.productSizeId === item.productSizeId
        );
      });
      // kiem tra topping trong san pham
      if (productOfCart) {
        const listToppingByUser = await getListProductToppingOfCart(
          user.userCode
        );
        const listToppingOfProduct = listToppingByUser.filter(
          (topping) => topping.cartCode === productOfCart.cartCode
        );
        // so sanh listToppingOfProduct voi activeTopping cua san pham can them vao gio hang
        if (listToppingOfProduct.length === 0) {
          isExistCart = true;
        }
      }

      if (!isExistCart) {
        // them cart vao database
        const response = await registerCart(cart, user);
        if (!response) {
          enqueueSnackbar("Add failed", {
            variant: "error",
            autoHideDuration: 2000,
            anchorOrigin: { vertical: "top", horizontal: "right" },
          });
        } else {
          const cartByUser = await getCartsByUser(user.userCode);
          dispatch(cartSlice.actions.initCart(cartByUser.data.data));
          // thong bao
          enqueueSnackbar("Add success", {
            variant: "success",
            autoHideDuration: 2000,
            anchorOrigin: { vertical: "top", horizontal: "right" },
          });
        }
      } else {
        enqueueSnackbar("Product is exist in cart", {
          variant: "error",
          autoHideDuration: 2000,
          anchorOrigin: { vertical: "top", horizontal: "right" },
        });
      }
    } else {
      enqueueSnackbar("Login to add product to cart", {
        variant: "error",
        autoHideDuration: 2000,
        anchorOrigin: { vertical: "top", horizontal: "right" },
      });
    }
  };
  return (
    <Box>
      <Box
        component="img"
        src={src}
        sx={{
          width: "100%",
          height: "280px",
          borderRadius: "12px",
          boxShadow: "0px 0px 13px 0px #00000040",
          "&:hover": { cursor: "pointer" },
        }}
        onClick={() => navigate(`/product/${id}`)}
      />
      <Box onClick={() => navigate(`/product/${id}`)}>
        <Typography
          sx={{
            mt: "10px",
            ml: "8px",
            color: "black",
            fontWeight: "600",
            "&:hover": { color: "rgb(0, 167, 111)", cursor: "pointer" },
          }}
        >
          {name}
        </Typography>
      </Box>
      <Typography sx={{ mt: "8px", ml: "8px" }}>
        {new Intl.NumberFormat("vi-VN", {
          style: "currency",
          currency: "VND",
        }).format(price)}
      </Typography>
      <Box sx={{ display: "flex", justifyContent: "space-between", mt: "4px" }}>
        <Button sx={{ color: "rgb(0, 167, 111)" }} onClick={handleAddCart}>
          <Typography variant="body2" sx={{ mr: "8px" }}>
            Thêm giỏ hàng
          </Typography>
          <ShoppingCartIcon />
        </Button>
        <Button sx={{ color: "rgb(0, 167, 111)" }}>
          <Typography variant="body2" sx={{ mr: "8px" }}>
            Yêu thích
          </Typography>
          <FavoriteIcon />
        </Button>
      </Box>
    </Box>
  );
}

export default ProductItem;
