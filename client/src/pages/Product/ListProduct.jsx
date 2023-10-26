import React from "react";
import ProductCarousel from "./components/ProductCarousel";
import { Box } from "@mui/material";
import ProductList from "./components/ProductList";

function ListProduct() {
  return (
    <Box>
      <ProductCarousel />
      <ProductList />
    </Box>
  );
}

export default ListProduct;
