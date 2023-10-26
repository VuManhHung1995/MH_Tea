import { v4 as uuidv4 } from "uuid";
import { changeDateToSql } from "../common-function/formatDate";
import axiosClient from "./axiosClient";

// api dang ki user
export const register = async (userInfo) => {
  try {
    const url = "api/v1/users/register";
    const user = {
      ...userInfo,
      createDate: changeDateToSql(new Date()),
      createBy: `${userInfo.firstName} ${userInfo.lastName}`,
      modifiedDate: changeDateToSql(new Date()),
      modifiedBy: `${userInfo.firstName} ${userInfo.lastName}`,
      role: userInfo.position ? userInfo.position : 0,
      userCode: uuidv4(),
      status: 0,
    };
    const data = await axiosClient.post(url, user);
    return data;
  } catch (error) {
    console.log(error);
  }
};
// api dang nhap
export const login = async (data) => {
  try {
    const url = "api/v1/users/login";
    // withCredentials: true cho phep set token vao cookie cua trinh duyet
    const result = await axiosClient.post(url, data, { withCredentials: true });
    return result.data;
  } catch (error) {
    return error.response ? error.response.data : null;
  }
};
// app get all user
export const getAllUser = async (queryParams) => {
  try {
    const url = "/api/v1/users";
    const listUser = await axiosClient.get(url, { params: queryParams });
    return listUser;
  } catch (error) {
    console.log("Error get AllUser", error);
  }
};

// api delete user
export const deleteUser = async (id) => {
  try {
    const existedUser = await checkUserIsExist({ id });
    if (existedUser) {
      const url = `/api/v1/users/${id}`;
      const result = await axiosClient.delete(url);
      return result;
    }
    return null;
  } catch (error) {
    console.log("Error delete user", error);
  }
};
// api get user by id
export const getUserById = async (id) => {
  try {
    const url = `/api/v1/users/${id}`;
    const result = await axiosClient.get(url);
    return result;
  } catch (error) {
    console.log("Error edit user", error);
  }
};

// edit user
export const editUser = async (dataUser, userCode) => {
  try {
    const existedUser = await checkUserIsExist({ email: dataUser.email });
    if (existedUser) {
      const url = `/api/v1/users/${userCode}`;
      const result = await axiosClient.patch(url, dataUser);
      return result;
    }
    return null;
  } catch (error) {
    console.log("Error delete user", error);
  }
};

// get token

export const verifyToken = async () => {
  try {
    const response = await axiosClient.get("/api/v1/users/get/check-login", {
      withCredentials: true,
    });
    return response;
  } catch (error) {
    console.log(error);
  }
};

// delete token

export const deleteToken = async () => {
  try {
    const response = await axiosClient.get("/api/v1/users/get/cancel-cookie", {
      withCredentials: true,
    });
    return response;
  } catch (error) {
    console.log(error);
  }
};

// check email is exist

export const checkUserIsExist = async ({ email, id }) => {
  const url = "api/v1/users";
  const users = await axiosClient.get(url);
  let existedUser;
  if (email) {
    existedUser = users.data.data.find((user) => user.email === email);
  }
  if (id) {
    existedUser = users.data.data.find((user) => user.userCode === id);
  }

  return !!existedUser;
};
