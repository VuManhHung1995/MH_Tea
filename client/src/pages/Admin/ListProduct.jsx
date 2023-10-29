import AddIcon from "@mui/icons-material/Add";
import { Box, Button, OutlinedInput, Paper, Typography } from "@mui/material";
import queryString from "query-string";
import React, { useEffect, useMemo, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { getAllProduct } from "../../api/productApi";
import Pagination from "./componnents/Pagination";
import TableProduct from "./componnents/TableProduct";

function ListProduct() {
  const location = useLocation();
  const navigate = useNavigate();
  const queryParams = useMemo(() => {
    const params = queryString.parse(location.search);
    return {
      ...params,
      page: Number.parseInt(params.page) ? Number.parseInt(params.page) : 1,
      pageSize: Number.parseInt(params.pageSize)
        ? Number.parseInt(params.pageSize)
        : 10,
    };
  }, [location.search]);
  const [listProduct, setListProduct] = useState([]);
  const [count, setCount] = useState(0);
  useEffect(() => {
    loadData();
  }, [queryParams]);

  const loadData = async () => {
    try {
      const listProduct = await getAllProduct(queryParams);

      setListProduct(listProduct.data.data);
      setCount(listProduct.data.count);
    } catch (error) {
      console.log(error);
    }
  };
  const handleChangeNameSearch = (e) => {
    const nameSearch = e.target.value;
    const filters = {
      ...queryParams,
      nameSearch,
    };

    navigate({
      pathname: "/admin/product",
      search: queryString.stringify(filters),
    });
  };
  const handleChangePagination = (newParams) => {
    const paramsString = queryString.stringify(newParams);
    navigate({
      pathname: "/admin/product",
      search: paramsString,
    });
  };
  return (
    <Box sx={{ flex: 1, ml: "320px", mr: "40px", mt: "80px", mb: "40px" }}>
      <Box sx={{ display: "flex", justifyContent: "space-between" }}>
        <Typography variant="h5">Product List</Typography>
        <Button
          variant="contained"
          onClick={() => {
            navigate("/admin/product/create");
          }}
          sx={{
            textTransform: "none",
            bgcolor: "rgb(33, 43, 54)",
            "&:hover": { bgcolor: "rgba(33, 43, 54, 0.8)" },
          }}
        >
          <AddIcon />
          New Product
        </Button>
      </Box>
      <Paper variant="0" sx={{ padding: "20px 10px", mt: "20px" }}>
        <OutlinedInput
          placeholder="Enter keyword to search product"
          size="small"
          sx={{ width: "50%", fontSize: "14px" }}
          onChange={handleChangeNameSearch}
          value={queryParams.nameSearch}
        />
      </Paper>
      <Paper
        variant="0"
        sx={{
          mt: "20px",
          // height: "330px",
          // overflow: "scroll",
          // "&::-webkit-scrollbar": { display: "none" },
        }}
      >
        <TableProduct listProduct={listProduct} loadData={loadData} />
      </Paper>
      <Paper>
        <Pagination
          count={count}
          onChange={handleChangePagination}
          queryParams={queryParams}
        />
      </Paper>
    </Box>
  );
}

export default ListProduct;
