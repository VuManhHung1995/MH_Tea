import axiosClient from "./axiosClient";

// add comment
export const addComment = async (comment) => {
  try {
    const url = "/api/v1/comments";
    return await axiosClient.post(url, comment);
  } catch (error) {
    console.log("Error comment api", error);
  }
};
// get all comment of product
export const getListComment = async (id) => {
  try {
    const url = `/api/v1/comments/${id}`;
    return await axiosClient.get(url);
  } catch (error) {
    console.log("Error comment api", error);
  }
};
