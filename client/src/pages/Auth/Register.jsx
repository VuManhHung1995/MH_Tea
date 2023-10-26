import { useSnackbar } from "notistack";
import React from "react";
import { register } from "../../api/userApi";
import RegisterForm from "./components/RegisterForm";
import { useNavigate } from "react-router-dom";

const Register = () => {
  const { enqueueSnackbar } = useSnackbar();
  const navigate = useNavigate();
  const handleSubmitForm = async (data) => {
    try {
      const reponse = await register(data);
      if (!reponse) {
        enqueueSnackbar("Email is existed!!!!!!", {
          variant: "error",
          autoHideDuration: 2000,
          anchorOrigin: { vertical: "top", horizontal: "right" },
        });
      } else {
        enqueueSnackbar("Sign Up Success!!!!!!", {
          variant: "success",
          autoHideDuration: 2000,
          anchorOrigin: { vertical: "top", horizontal: "right" },
        });
        navigate("/login");
      }
    } catch (error) {
      console.log(error);
    }
  };
  return <RegisterForm handleSubmitForm={handleSubmitForm} />;
};

export default Register;
