import { Box, Button, Divider } from "@mui/material";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import InputField from "../../../../components/form-controls/InputField";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useSnackbar } from "notistack";
import { verifyUser } from "../../../../common-function/checkUserIsExist";
import { registerOrder } from "../../../../api/orderApi";
import cartSlice from "../../cartSlice";

const schema = yup
  .object({
    recevierName: yup.string().required("recevierName is require"),
    phoneNumber: yup
      .number()
      .typeError("phone number must be a number")
      .required("phone number is require"),
    adress: yup.string().required("adress is require"),
  })
  .required();

function AccumulatorCart() {
  const user = useSelector((state) => state.users.currentUser);
  const carts = useSelector((state) => state.carts.cart);
  const statusCheckBox = useSelector((state) => state.carts.statusCheckBox);

  const dispatch = useDispatch();

  const form = useForm({
    resolver: yupResolver(schema),
    defaultValues: {
      recevierName: "",
      adress: "",
    },
  });
  const accumulatorCarts = carts.filter((cart) =>
    statusCheckBox.includes(cart.cartCode)
  );

  const [totalPrice, setTotalPrice] = useState(0);
  const [shippingPrice] = useState(0);
  const [discountPrice] = useState(0);
  const [tax] = useState(8);
  const [totals, setTotals] = useState(0);
  const { enqueueSnackbar } = useSnackbar();

  useEffect(() => {
    const result = accumulatorCarts.reduce((accumulator, currentValue) => {
      return accumulator + currentValue.totalPrice;
    }, 0);
    setTotalPrice(result);
    setTotals(((result + shippingPrice - discountPrice) * (100 + tax)) / 100);
  }, [accumulatorCarts]);

  const onSubmit = async (data) => {
    if (statusCheckBox.length === 0) {
      enqueueSnackbar(`No products have been selected yet`, {
        variant: "warning",
        autoHideDuration: 2000,
        anchorOrigin: { vertical: "top", horizontal: "right" },
      });
    } else {
      const isCheckExistUser = await verifyUser(user.email);
      if (isCheckExistUser) {
        const response = await registerOrder(accumulatorCarts, user, data);
        if (response.data.status === 201) {
          // Xoa thong tin cart va topping tren store
          accumulatorCarts.forEach((item) => {
            dispatch(cartSlice.actions.deleteCart(item.cartCode));
          });
          dispatch(cartSlice.actions.updateStatusCheckbox([]));
        }
      } else {
        enqueueSnackbar("Login to add product to cart", {
          variant: "error",
          autoHideDuration: 2000,
          anchorOrigin: { vertical: "top", horizontal: "right" },
        });
      }
    }
  };

  return (
    <>
      <Box
        sx={{
          ml: "40px",
          border: "1px solid rgba(224, 224, 224, 1)",
          borderRadius: "8px",
          p: "40px 20px",
        }}
      >
        <Box
          sx={{
            fontWeight: 600,
            fontSize: "16px",
            mb: "15px",
          }}
        >
          Summary
        </Box>
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            fontSize: "13px",
            mt: "15px",
          }}
        >
          <Box component="span">Subtotal</Box>
          <Box component="span" sx={{ fontWeight: 600 }}>
            {new Intl.NumberFormat("vi-VN", {
              style: "currency",
              currency: "VND",
            }).format(totalPrice)}
          </Box>
        </Box>
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            fontSize: "13px",
            mt: "15px",
          }}
        >
          <Box component="span">Shipping</Box>
          <Box component="span" sx={{ fontWeight: 600 }}>
            {new Intl.NumberFormat("vi-VN", {
              style: "currency",
              currency: "VND",
            }).format(shippingPrice)}
          </Box>
        </Box>
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            fontSize: "13px",
            mt: "15px",
          }}
        >
          <Box component="span">Discount</Box>
          <Box component="span" sx={{ fontWeight: 600 }}>
            -
            {new Intl.NumberFormat("vi-VN", {
              style: "currency",
              currency: "VND",
            }).format(discountPrice)}
          </Box>
        </Box>
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            fontSize: "13px",
            mt: "15px",
          }}
        >
          <Box component="span">Tax</Box>
          <Box component="span" sx={{ fontWeight: 600 }}>
            {tax}%
          </Box>
        </Box>
        <Box sx={{ position: "relative" }}>
          <Box
            component="input"
            placeholder="Discount Code"
            fontSize="12px"
            sx={{
              mt: "20px",
              bgcolor: "rgba(145, 158, 171, 0.08)",
              color: "rgb(33, 43, 54)",
              border: "none",
              width: "100%",
              p: "15px 10px",
              borderRadius: "8px",
              outline: "none",
            }}
          />
          <Button
            variant="text"
            sx={{
              position: "absolute",
              right: "10px",
              top: "40%",
              color: "rgb(0, 167, 111)",
            }}
          >
            Apply
          </Button>
        </Box>
        <Divider sx={{ mt: "20px" }} />
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            fontSize: "13px",
            mt: "15px",
          }}
        >
          <Box component="span" sx={{ fontWeight: 600, fontSize: "16px" }}>
            Total
          </Box>
          <Box component="span" sx={{ fontWeight: 600 }}>
            {new Intl.NumberFormat("vi-VN", {
              style: "currency",
              currency: "VND",
            }).format(totals)}
          </Box>
        </Box>
      </Box>
      <Box
        component="form"
        onSubmit={form.handleSubmit(onSubmit)}
        sx={{
          ml: "40px",
          border: "1px solid rgba(224, 224, 224, 1)",
          borderRadius: "8px",
          p: "40px 20px",
          mt: "20px",
        }}
      >
        <Box
          sx={{
            fontWeight: 600,
            fontSize: "16px",
            mb: "15px",
          }}
        >
          Customer Information
        </Box>
        <Box sx={{ mb: "10px" }}>
          <InputField
            form={form}
            label="Recevier Name"
            name="recevierName"
            customSize
          />
        </Box>
        <Box sx={{ mb: "10px" }}>
          <InputField
            form={form}
            label="Phone Number"
            name="phoneNumber"
            customSize
          />
        </Box>

        <InputField form={form} label="Adress" name="adress" customSize />
        <Box
          component={Button}
          type="submit"
          variant="contained"
          width="100%"
          sx={{
            p: "10px",
            mt: "30px",
            bgcolor: "rgb(0, 167, 111)",
            "&:hover": { bgcolor: "rgba(0, 167, 111, 0.9)" },
          }}
        >
          Checkout
        </Box>
      </Box>
    </>
  );
}

export default AccumulatorCart;
