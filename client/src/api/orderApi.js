import axiosClient from "./axiosClient";
import { v4 as uuidv4 } from "uuid";
import { changeDateToSql } from "../common-function/formatDate";

export const registerOrder = async (accumulatorCarts, user, dataInfor) => {
  try {
    console.log("da vao call api ");
    const url = "/api/v1/orders";
    const order = {
      orderCode: uuidv4(),
      accumulatorCarts,
      data: dataInfor,
      createDate: changeDateToSql(new Date()),
      createBy: `${user.firstName} ${user.lastName}`,
    };
    console.log("truoc call api");
    const data = await axiosClient.post(url, order, dataInfor);
    console.log(data, "data");
    return data;
  } catch (error) {}
};
