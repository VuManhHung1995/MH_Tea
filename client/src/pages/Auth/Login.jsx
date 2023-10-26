import { useSnackbar } from "notistack";
import React from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { login } from "../../api/userApi";
import LoginForm from "./components/LoginForm";
import userSlice from "./userSlice";

const Login = () => {
  const navigate = useNavigate();
  const { enqueueSnackbar } = useSnackbar();
  const dispatch = useDispatch();
  const handleSubmitForm = async (data) => {
    try {
      const response = await login(data);
      if (!response) {
        console.log("Loi server");
      } else {
        if (response.status === 200) {
          enqueueSnackbar(`${response.userMsg}`, {
            variant: "success",
            autoHideDuration: 2000,
            anchorOrigin: { vertical: "top", horizontal: "right" },
          });
          // đẩy thông tin user lên redux
          dispatch(userSlice.actions.login(response.data));
          // Lưu thông tin user lên local
          localStorage.setItem("user", JSON.stringify(response.data));
          if (response.data.role === 1) {
            navigate("/admin");
          } else {
            navigate("/");
          }
        } else {
          enqueueSnackbar(`${response.userMsg}`, {
            variant: "warning",
            anchorOrigin: { vertical: "top", horizontal: "right" },
            autoHideDuration: 2000,
          });
        }
      }
    } catch (error) {
      console.log("login", error);
    }
  };
  return <LoginForm handleSubmitForm={handleSubmitForm} />;
};

export default Login;
