import { Chip } from "@mui/material";
import React from "react";
import { useEffect } from "react";
import { getAllToppingByOrderDetail } from "../../../../api/orderApi";
import { useState } from "react";

function ToppingChipOrder({ orderDetailCode }) {
  const [listTopping, setListTopping] = useState([]);
  useEffect(() => {
    const loadDataTopping = async () => {
      try {
        const listToppingOrder = await getAllToppingByOrderDetail(
          orderDetailCode
        );
        setListTopping(listToppingOrder.data.data);
      } catch (error) {
        console.log(error);
      }
    };
    loadDataTopping();
  }, []);
  return (
    <>
      {listTopping.map((topping) => (
        <Chip
          key={topping.productAndToppingOfOderId}
          label={topping.productToppingName}
          sx={{
            "&:hover": { bgcolor: "rgba(0, 167, 111, 0.5)" },
            m: "4px",
          }}
        />
      ))}
    </>
  );
}

export default ToppingChipOrder;
