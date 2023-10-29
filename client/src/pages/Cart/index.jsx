import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import { Box, Grid } from "@mui/material";
import React from "react";

import { useSelector } from "react-redux";
import AccumulatorCart from "./components/AccumulatorCart";
import ListCart from "./components/ListCart";

function Cart() {
  const carts = useSelector((state) => state.carts.cart);

  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        mt: "60px",
      }}
    >
      <Grid container sx={{ width: "1300px", mt: "40px" }}>
        <Grid item xs={12} sx={{ mb: "20px" }}>
          <Box sx={{ display: "flex", alignContent: "center" }}>
            <ShoppingCartIcon sx={{ height: "31.5px", mr: "10px" }} />
            <Box component="h2">Shopping Cart</Box>
          </Box>
        </Grid>
        <Grid item xs={carts.length > 0 ? 8 : 12}>
          <ListCart />
        </Grid>
        {carts.length > 0 ? (
          <Grid item xs={4}>
            <AccumulatorCart />
          </Grid>
        ) : (
          <></>
        )}
      </Grid>
    </Box>
  );
}

export default Cart;
