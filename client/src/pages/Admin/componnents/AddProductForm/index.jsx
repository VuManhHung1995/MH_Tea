import { yupResolver } from "@hookform/resolvers/yup";
import { Box, Paper, Typography } from "@mui/material";
import Button from "@mui/material/Button";
import Grid from "@mui/material/Grid";
import * as React from "react";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { getAllCategory } from "../../../../api/categoryApi";
import { getBase64 } from "../../../../common-function/getBase64";
import InputField from "../../../../components/form-controls/InputField";
import SelectField from "../../../../components/form-controls/SelectField";
import TextareaField from "../../../../components/form-controls/TextareaField";

const schema = yup
  .object({
    productName: yup.string().required("Product Name is required"),
    category: yup.string().required("Category is required"),
    description: yup.string().required("Description is required"),
    price: yup.number().required("Price is required"),
  })
  .required();

export default function AddProductForm({ handleSubmitForm }) {
  const form = useForm({
    resolver: yupResolver(schema),
    defaultValues: {
      productName: "",
      category: "",
      description: "",
      price: "",
    },
  });
  const onSubmit = (data) => handleSubmitForm(data, srcImage);

  const [categoryList, setCategoryList] = React.useState([]);

  const [srcImage, setSrcImage] = useState("");

  // lay du lieu danh muc san pham
  useEffect(() => {
    (async () => {
      try {
        const list = await getAllCategory();
        const newList = list.data.data.map((value) => ({
          key: value.categoryCode,
          value: value.categoryName,
        }));
        setCategoryList(newList);
      } catch (error) {
        console.log("AddProductForm", error);
      }
    })();
  }, []);

  // xu li up anh san pham
  const handleChangeImage = async (e) => {
    try {
      let file = e.target.files[0];
      if (file) {
        let base64 = await getBase64(file);
        setSrcImage(base64);
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Box component="form" onSubmit={form.handleSubmit(onSubmit)}>
      <Paper sx={{ p: "40px" }}>
        <Grid container spacing={2}>
          <Grid item xs={4}>
            <InputField name="productName" label="Product Name" form={form} />
          </Grid>
          <Grid item xs={4}>
            <InputField name="price" label="Price" form={form} />
          </Grid>
          <Grid item xs={4}>
            <SelectField
              form={form}
              name="category"
              label="Category"
              list={categoryList}
            />
          </Grid>
          <Grid item xs={12}>
            <TextareaField
              form={form}
              name="description"
              label="Description"
              minRows={2}
            />
          </Grid>
          <Grid item xs={12}>
            <Box
              sx={{
                bgcolor: "rgb(246, 249, 252)",
                border: "1.5px dashed rgb(227, 233, 239)",
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",
                padding: "32px 0",
              }}
            >
              {srcImage ? (
                <Box
                  component="img"
                  src={srcImage}
                  sx={{
                    width: "60px",
                    height: "60px",
                    borderRadius: "12px",
                    mr: "10px",
                    mb: "20px",
                  }}
                />
              ) : (
                <></>
              )}
              <input type="file" onChange={handleChangeImage} />
              <Typography
                sx={{
                  fontSize: "12px",
                  color: "rgb(125, 135, 156)",
                  mt: "20px",
                }}
              >
                Upload 280*280 image
              </Typography>
            </Box>
          </Grid>
          <Grid item xs={3}>
            <Button type="submit">Save Product</Button>
          </Grid>
        </Grid>
      </Paper>
    </Box>
  );
}
