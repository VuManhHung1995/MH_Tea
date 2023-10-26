import CoffeeIcon from "@mui/icons-material/Coffee";
import {
  Box,
  Button,
  Button as ButtonMui,
  Grid,
  Typography,
} from "@mui/material";
import { useSnackbar } from "notistack";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";

import { registerCart } from "../../api/cartApi";
import { convertBufferToBase64 } from "../../common-function/getBase64";

import {
  getListProductSize,
  getListProductTopping,
  getListProductToppingOfCart,
  getProductById,
} from "../../api/productApi";
import { verifyUser } from "../../common-function/checkUserIsExist";

function ProductDetail() {
  const [product, setProduct] = useState({});
  const [opacity, setOpacity] = useState(0);
  const [mainImage, setMainImage] = useState(null);
  const [listSize, setListSize] = useState([]);
  const [activeSize, setActiveSize] = useState(null);
  const [listTopping, setListTopping] = useState([]);
  const [activeTopping, setActiveTopping] = useState([]);
  const [optionPrice, setOptionPrice] = useState(0);

  const navigate = useNavigate();

  const { enqueueSnackbar } = useSnackbar();
  const { id } = useParams();
  const user = useSelector((state) => state.users.currentUser);
  const carts = useSelector((state) => state.carts.cart);

  // Lấy dữ liệu size product, topping
  useEffect(() => {
    (async () => {
      try {
        const sizes = await getListProductSize();
        const toppings = await getListProductTopping();
        setListSize(sizes);
        setListTopping(toppings);
      } catch (error) {
        console.log(error);
      }
    })();
  }, []);
  // Lấy dữ liệu product
  useEffect(() => {
    (async () => {
      try {
        const response = await getProductById(id);
        if (response.data.status === 200) {
          setProduct(response.data.data);
        }
      } catch (error) {
        console.log(error);
      }
    })();
  }, [id]);
  // tinh toan tong tien cua cac option them
  useEffect(() => {
    let total = activeSize ? activeSize.productSizePrice : 0;
    total = activeTopping.reduce(
      (previousValue, currentValue) =>
        previousValue + currentValue.productToppingPrice,
      total
    );
    setOptionPrice(total);
  }, [activeSize, activeTopping]);

  // Xu li them san pham vao gio hang
  const handleAddCart = async () => {
    // Kiem tra xem user con dang nhap khong
    const isCheckExistUser = await verifyUser(user.email);
    if (isCheckExistUser) {
      const cart = {
        productCode: id,
        userCode: user.userCode,
        productSizeId: activeSize?.productSizeId || 1,
        listTopping: activeTopping || [],
        total: 1,
        totalPrice: product.price + optionPrice,
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
        if (activeTopping.length === listToppingOfProduct.length) {
          isExistCart = activeTopping.every((topping) => {
            return listToppingOfProduct.find(
              (toppingOfProduct) =>
                toppingOfProduct.productToppingId === topping.productToppingId
            );
          });
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
          // tro ve trang san pham
          navigate("/");
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
  // xu li khi xem cac anh lien quan san pham
  const handleClickImage = (index, value) => {
    setOpacity(index);
    setMainImage(value);
  };
  // xu li click vao size
  const handleSize = (size) => {
    setActiveSize(size);
  };
  // xu li khi click vao topping
  const handleTopping = (topping) => {
    setActiveTopping((state) => {
      const isCheck = state.find(
        (item) => item.productToppingId === topping.productToppingId
      );
      if (isCheck) {
        const newState = state.filter(
          (item) => item.productToppingId !== topping.productToppingId
        );
        return newState;
      }
      return [...state, topping];
    });
  };
  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        mt: "60px",
      }}
    >
      <Grid container sx={{ width: "1200px", mt: "40px" }}>
        <Grid item xs={6} pr="50px">
          <Box
            component="img"
            src={convertBufferToBase64(
              mainImage ? mainImage : product.srcImage
            )}
            sx={{
              width: "100%",
              borderRadius: "12px",
              "&:hover": { cursor: "pointer" },
            }}
          />
          <Grid container justifyContent={"space-between"} ml="5px">
            {[
              product.srcImage,
              product.srcImage,
              product.srcImage,
              product.srcImage,
              product.srcImage,
            ].map((value, index) => (
              <Grid item sx={2} flexBasis={"20%"} pr="10px" key={index}>
                <Box
                  component="img"
                  src={convertBufferToBase64(value)}
                  sx={{
                    width: "100%",
                    borderRadius: "12px",
                    "&:hover": { cursor: "pointer", opacity: "1" },
                    opacity: opacity === index ? "1" : "0.5",
                  }}
                  onClick={() => handleClickImage(index, value)}
                />
              </Grid>
            ))}
          </Grid>
        </Grid>
        <Grid item xs={6}>
          <Typography sx={{ fontSize: "26px", fontWeight: "600" }}>
            {product.productName}
          </Typography>
          <Typography
            sx={{
              fontSize: "20px",
              fontWeight: "600",
              color: "rgb(0, 167, 111)",
              mb: "20px",
            }}
          >
            {new Intl.NumberFormat("vi-VN", {
              style: "currency",
              currency: "VND",
            }).format(product.price + optionPrice)}
          </Typography>
          <Typography>Chọn size</Typography>
          <Box sx={{ mt: "10px" }}>
            {listSize.map((value) => {
              return (
                <Box
                  component={Button}
                  variant="outlined"
                  startIcon={<CoffeeIcon />}
                  color={
                    activeSize?.productSizeId === value.productSizeId
                      ? "white"
                      : "#666"
                  }
                  bgcolor={
                    activeSize?.productSizeId === value.productSizeId
                      ? "rgb(0, 167, 111)"
                      : ""
                  }
                  borderColor="#666"
                  sx={{
                    mr: "6px",
                    mb: "10px",
                    "&:hover": {
                      bgcolor: "rgba(0, 167, 111, 0.9)",
                      color: "white",
                    },
                  }}
                  key={value.productSizeId}
                  onClick={() => handleSize(value)}
                >
                  {`${value.productSizeName} + ${value.productSizePrice}đ`}
                </Box>
              );
            })}
          </Box>
          <Typography sx={{ mt: "20px", mb: "10px" }}>Topping</Typography>
          <Box>
            {listTopping?.map((item) => (
              <Box
                component={ButtonMui}
                variant="outlined"
                color={
                  activeTopping.findIndex(
                    (activeItem) =>
                      activeItem.productToppingId === item.productToppingId
                  ) !== -1
                    ? "white"
                    : "#666"
                }
                bgcolor={
                  activeTopping.findIndex(
                    (activeItem) =>
                      activeItem.productToppingId === item.productToppingId
                  ) !== -1
                    ? "rgb(0, 167, 111)"
                    : ""
                }
                borderColor="#666"
                sx={{
                  mr: "10px",
                  mb: "10px",
                  "&:hover": {
                    bgcolor: "rgba(0, 167, 111, 0.9)",
                    color: "white",
                  },
                }}
                key={item.productToppingId}
                onClick={() => handleTopping(item)}
              >
                {item.productToppingName} + {item.productToppingPrice}đ
              </Box>
            ))}
          </Box>
          <Box
            component={ButtonMui}
            variant="contained"
            width="100%"
            sx={{
              mt: "20px",
              bgcolor: "rgb(0, 167, 111)",
              "&:hover": { bgcolor: "rgba(0, 167, 111, 0.9)" },
            }}
            onClick={handleAddCart}
          >
            Thêm vào giỏ hàng
          </Box>
        </Grid>
      </Grid>
    </Box>
  );
}

export default ProductDetail;
