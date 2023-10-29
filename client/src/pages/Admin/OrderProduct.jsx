import { Box, OutlinedInput, Paper, Typography } from "@mui/material";
import queryString from "query-string";
import React, { useEffect, useMemo, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { getAllOrder } from "../../api/orderApi";
import Pagination from "./componnents/Pagination";
import TableOrder from "./componnents/TableOrder";

function OrderProduct() {
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
  const [listOrder, setListOrder] = useState([]);
  const [count, setCount] = useState(0);
  useEffect(() => {
    loadData();
  }, [queryParams]);

  const loadData = async () => {
    try {
      const listOrder = await getAllOrder(queryParams);

      setListOrder(listOrder.data.data);
      setCount(listOrder.data.count);
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
      pathname: "/admin/order",
      search: queryString.stringify(filters),
    });
  };
  const handleChangePagination = (newParams) => {
    const paramsString = queryString.stringify(newParams);
    navigate({
      pathname: "/admin/order",
      search: paramsString,
    });
  };
  return (
    <Box sx={{ flex: 1, ml: "320px", mr: "40px", mt: "80px" }}>
      <Typography variant="h5">Order List</Typography>
      <Paper variant="0" sx={{ padding: "20px 10px", mt: "20px" }}>
        <OutlinedInput
          placeholder="Enter keyword to search order"
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
        <TableOrder listOrder={listOrder} />
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

export default OrderProduct;
