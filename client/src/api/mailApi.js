import axiosClient from "./axiosClient";

// send email
export const sendMail = async (queryParams) => {
  try {
    const url = "/api/v1/email";
    return await axiosClient.get(url, { params: queryParams });
  } catch (error) {
    console.log("Error email api", error);
  }
};
