import axiosClient from "./axiosClient";
import { v4 as uuidv4 } from "uuid";
import { changeDateToSql } from "../common-function/formatDate";

export const registerOrder = async (
  accumulatorCarts,
  user,
  dataInfor,
  totals
) => {
  try {
    const url = "/api/v1/orders";
    const order = {
      orderCode: uuidv4(),
      userCode: user.userCode,
      accumulatorCarts,
      data: dataInfor,
      totals: totals,
      createDate: changeDateToSql(new Date()),
      createBy: `${user.firstName} ${user.lastName}`,
    };
    const data = await axiosClient.post(url, order);
    return data;
  } catch (error) {}
};
export const getAllOrder = async (queryParams) => {
  try {
    const url = "/api/v1/orders";
    const listOrder = await axiosClient.get(url, { params: queryParams });
    return listOrder;
  } catch (error) {
    console.log("Error get Product api", error);
  }
};

export const getOrderDetailByOrderCode = async (orderCode) => {
  try {
    const url = `/api/v1/orders/${orderCode}`;
    const orderDetails = await axiosClient.get(url);
    return orderDetails;
  } catch (error) {
    console.log(error);
  }
};

export const getAllToppingByOrderDetail = async (orderDetailCode) => {
  try {
    const url = `/api/v1/orders/get-topping/${orderDetailCode}`;
    const listTopping = await axiosClient.get(url);
    return listTopping;
  } catch (error) {
    console.log(error);
  }
};

export const getAllOrderDetailByUser = async (userCode) => {
  try {
    const url = `/api/v1/orders/user/${userCode}`;
    const orderDetailOfUser = await axiosClient.get(url);
    return orderDetailOfUser;
  } catch (error) {
    console.log(error);
  }
};
