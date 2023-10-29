import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import { Box, Grid } from "@mui/material";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { getAllOrderDetailByUser } from "../../../api/orderApi";
import TableProductDetail from "../../Admin/componnents/ListProductDetail/TableProductDetail";

function ListOrder() {
  const [listOrder, setListOrder] = useState([]);
  const user = useSelector((state) => state.users.currentUser);
  console.log(user, "userrrr");
  useEffect(() => {
    const loadData = async () => {
      try {
        const listOrder = await getAllOrderDetailByUser(user.userCode);
        setListOrder(listOrder.data.data);
      } catch (error) {
        console.log(error);
      }
    };
    loadData();
  }, []);
  console.log(listOrder, "list order");
  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        mt: "60px",
      }}
    >
      <Grid
        container
        sx={{ width: "1300px", mt: "40px" }}
        style={{ minHeight: "calc(100vh - 390px" }}
      >
        <Grid item xs={12}>
          <Box sx={{ display: "flex", alignContent: "center" }}>
            <ShoppingCartIcon sx={{ height: "31.5px", mr: "10px" }} />
            <Box component="h2">My List Order</Box>
          </Box>
        </Grid>
        <Grid item xs={12}>
          <TableProductDetail orderDetails={listOrder} />
        </Grid>
      </Grid>
    </Box>
  );
}

export default ListOrder;
