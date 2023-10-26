import { v4 as uuidv4 } from "uuid";
import { changeDateToSql } from "../common-function/formatDate";
import axiosClient from "./axiosClient";

// register product
export const registerCart = async (cartInfo, user) => {
  try {
    const url = "api/v1/carts";
    const cart = {
      cartCode: uuidv4(),
      ...cartInfo,
      createDate: changeDateToSql(new Date()),
      createBy: `${user.firstName} ${user.lastName}`,
      modifiedDate: changeDateToSql(new Date()),
      modifiedBy: `${user.firstName} ${user.lastName}`,
    };
    const data = await axiosClient.post(url, cart);
    return data;
  } catch (error) {
    console.log(error);
  }
};

// export const checkCartIsExist = async (userCode, productCode) => {
//   try {
//     const url = "api/v1/carts";
//     const carts = await axiosClient.get(url);
//     const existedCart = carts.data.data.find(
//       (cart) => cart.productCode === productCode && cart.userCode === userCode
//     );
//     return !!existedCart;
//   } catch (error) {
//     console.log(error);
//   }
// };

export const getCartsByUser = async (userCode) => {
  try {
    const url = `api/v1/carts/${userCode}`;
    const cart = await axiosClient.get(url);
    return cart;
  } catch (error) {
    console.log(error);
  }
};

// Xoa topping cua san pham co trong cart
export const deleteTopping = async (productToppingId, cartCode) => {
  try {
    const url = "api/v1/carts/delete/topping";
    const response = await axiosClient.delete(url, {
      params: { productToppingId, cartCode },
    });
    return response;
  } catch (error) {
    console.log(error);
  }
};

// xoa 1 cart
export const deleteOneCart = async (cartCode) => {
  try {
    const url = `api/v1/carts/${cartCode}`;
    const response = await axiosClient.delete(url);
    return response;
  } catch (error) {
    console.log(error);
  }
};

// Cap nhat so luong san pham trong cart
export const updateQuantityOneCart = async (cartCode, quantity) => {
  try {
    const url = `api/v1/carts/${cartCode}?quantity=${quantity}`;
    const response = await axiosClient.patch(url);
    return response;
  } catch (error) {
    console.log(error);
  }
};

// Cap nhat totalPrice trong cart
export const updateTotalPrice = async (cartCode, totalPrice) => {
  try {
    if (totalPrice) {
      const url = `api/v1/carts/${cartCode}?totalPrice=${totalPrice}`;
      const response = await axiosClient.patch(url);
      return response;
    }
  } catch (error) {
    console.log(error);
  }
};
