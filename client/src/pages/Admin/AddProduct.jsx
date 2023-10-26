import { Box, Typography } from "@mui/material";
import { useSnackbar } from "notistack";
import React from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { registerProduct } from "../../api/productApi";
import AddProductForm from "./componnents/AddProductForm";

const AddProduct = () => {
  const { enqueueSnackbar } = useSnackbar();
  const user = useSelector((state) => state.users.currentUser);
  const navigate = useNavigate();
  const handleSubmitForm = async (data, srcImage) => {
    if (srcImage) {
      data.srcImage = srcImage;
    } else {
      data.srcImage = "";
    }
    try {
      const reponse = await registerProduct(data, user);

      if (!reponse) {
        enqueueSnackbar("Product is existed!!!!!!", {
          variant: "error",
          autoHideDuration: 2000,
          anchorOrigin: { vertical: "top", horizontal: "right" },
        });
      } else {
        enqueueSnackbar("Add Product Success!!!!!!", {
          variant: "success",
          autoHideDuration: 2000,
          anchorOrigin: { vertical: "top", horizontal: "right" },
        });
        navigate("/admin/product");
      }
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <Box sx={{ flex: 1, ml: "320px", mr: "40px", mt: "80px" }}>
      <Typography variant="h5" sx={{ mb: "20px" }}>
        Add New Product
      </Typography>
      <AddProductForm handleSubmitForm={handleSubmitForm} />
    </Box>
  );
};

export default AddProduct;
