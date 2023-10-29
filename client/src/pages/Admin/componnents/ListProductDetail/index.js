import React, { useEffect, useState } from "react";
import { getOrderDetailByOrderCode } from "../../../../api/orderApi";
import TableProductDetail from "./TableProductDetail";

function ListProductDetail({ orderCode }) {
  const [orderDetails, setOrderDetails] = useState([]);
  useEffect(() => {
    const loadData = async () => {
      const resultOrderDetail = await getOrderDetailByOrderCode(orderCode);
      setOrderDetails(resultOrderDetail.data.data);
    };
    loadData();
  }, []);

  console.log(orderDetails, "orderDetail");
  return <TableProductDetail orderDetails={orderDetails} />;
}

export default ListProductDetail;
