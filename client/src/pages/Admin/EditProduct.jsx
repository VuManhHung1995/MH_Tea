import { useSnackbar } from "notistack";
import React from "react";
import {
  checkProductIsExist,
  editProduct,
  registerProduct,
} from "../../api/productApi";
import EditProductForm from "./componnents/EditProductForm";
import { Box, Typography } from "@mui/material";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

const EditProduct = () => {
  const { enqueueSnackbar } = useSnackbar();
  const user = useSelector((state) => state.users.currentUser);
  const navigate = useNavigate();
  const handleSubmitForm = async (data, srcImage, id) => {
    console.log(id, "id ");
    if (srcImage) {
      data.srcImage = srcImage;
    } else {
      data.srcImage = "";
    }
    try {
      console.log(data);
      // dang lam o day
      const isCheck = await checkProductIsExist(id);
      if (isCheck) {
        const response = await editProduct(data, id);
        console.log(response, "res");
        enqueueSnackbar("Edit Product Success!!!!!!", {
          variant: "success",
          autoHideDuration: 2000,
          anchorOrigin: { vertical: "top", horizontal: "right" },
        });
        navigate("/admin/product");
      } else {
        enqueueSnackbar("Product isn't existed!!!!!!", {
          variant: "error",
          autoHideDuration: 2000,
          anchorOrigin: { vertical: "top", horizontal: "right" },
        });
      }
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <Box sx={{ flex: 1, ml: "320px", mr: "40px", mt: "80px" }}>
      <Typography variant="h5" sx={{ mb: "20px" }}>
        Edit New Product
      </Typography>
      <EditProductForm handleSubmitForm={handleSubmitForm} />
    </Box>
  );
};

export default EditProduct;
