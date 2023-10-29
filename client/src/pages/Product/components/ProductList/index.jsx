import { Box, Grid } from "@mui/material";
import React, { useEffect, useState } from "react";
import { getAllProduct } from "../../../../api/productApi";
import { convertBufferToBase64 } from "../../../../common-function/getBase64";
import ProductItem from "../ProductItem";

function ProductList() {
  const [listProduct, setListProduct] = useState([]);
  const loadData = async () => {
    try {
      const listProduct = await getAllProduct();
      setListProduct(listProduct);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    loadData();
  }, []);

  return (
    <Box>
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          mt: "60px",
        }}
      >
        <Grid
          container
          sx={{ width: "1200px" }}
          rowSpacing={3}
          columnSpacing={4}
        >
          {listProduct?.data?.data.map((product) => (
            <Grid item xs={3} key={product.productCode}>
              <ProductItem
                src={convertBufferToBase64(product.srcImage)}
                name={product.productName}
                price={product.price}
                id={product.productCode}
              />
            </Grid>
          ))}
        </Grid>
      </Box>
    </Box>
  );
}

export default ProductList;
