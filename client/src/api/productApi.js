import { v4 as uuidv4 } from "uuid";
import { changeDateToSql } from "../common-function/formatDate";
import axiosClient from "./axiosClient";

// get all product
export const getAllProduct = async (queryParams) => {
  try {
    const url = "/api/v1/products";
    const listProduct = await axiosClient.get(url, { params: queryParams });
    return listProduct;
  } catch (error) {
    console.log("Error get Product api", error);
  }
};
// api delete product
export const deleteProduct = async (id) => {
  try {
    const existedProduct = await checkProductIsExist(id);
    if (existedProduct) {
      const url = `/api/v1/products/${id}`;
      const result = await axiosClient.delete(url);
      return result;
    }
    return null;
  } catch (error) {
    console.log("Error delete user", error);
  }
};

// register product
export const registerProduct = async (productInfo, user) => {
  try {
    const url = "api/v1/products";
    const product = {
      ...productInfo,
      publish: 1,
      createDate: changeDateToSql(new Date()),
      createBy: `${user.firstName} ${user.lastName}`,
      modifiedDate: changeDateToSql(new Date()),
      modifiedBy: `${user.firstName} ${user.lastName}`,
      productCode: uuidv4(),
    };
    const isCheck = await checkProductIsExist(product.productCode);
    if (!isCheck) {
      const data = await axiosClient.post(url, product);
      return data;
    }
    return null;
  } catch (error) {
    console.log(error);
  }
};

// api get product by id
export const getProductById = async (id) => {
  try {
    const url = `/api/v1/products/${id}`;
    const result = await axiosClient.get(url);
    return result;
  } catch (error) {
    console.log("Error product detail", error);
  }
};

// edit product
export const editProduct = async (dataProduct, productCode) => {
  try {
    const url = `/api/v1/products/${productCode}`;
    const result = await axiosClient.patch(url, dataProduct);
    return result;
  } catch (error) {
    console.log("Error edit product", error);
  }
};

// check exist product
export const checkProductIsExist = async (id) => {
  try {
    const url = "api/v1/products";
    const products = await axiosClient.get(url);
    const existedProduct = products.data.data.find(
      (product) => product.productCode === id
    );
    return !!existedProduct;
  } catch (error) {
    console.log(error);
  }
};

// get all product size
export const getListProductSize = async () => {
  try {
    const url = "api/v1/products/get/product-size";
    const result = await axiosClient.get(url);
    return result.data.data;
  } catch (error) {
    console.log(error);
  }
};

// get all product topping
export const getListProductTopping = async () => {
  try {
    const url = "api/v1/products/get/product-topping";
    const result = await axiosClient.get(url);
    return result.data.data;
  } catch (error) {
    console.log(error);
  }
};

// get topping of cart
export const getListProductToppingOfCart = async (userCode) => {
  try {
    const url = `api/v1/products/get/product-topping-of-cart`;
    const result = await axiosClient.get(url, { params: { userCode } });
    return result.data.data;
  } catch (error) {
    console.log(error);
  }
};
