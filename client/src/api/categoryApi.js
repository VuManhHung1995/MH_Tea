import axiosClient from "./axiosClient";

// get all product
export const getAllCategory = async (queryParams) => {
  try {
    const url = "/api/v1/categories";
    const listCategory = await axiosClient.get(url, { params: queryParams });
    return listCategory;
  } catch (error) {
    console.log("Error get Category api", error);
  }
};
