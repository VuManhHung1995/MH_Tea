import { useSnackbar } from "notistack";
import React from "react";
import { checkUserIsExist, register } from "../../../../api/userApi";
import AddUserForm from "../AddUserForm";

const AddUser = ({ handleClose, loadData }) => {
  const { enqueueSnackbar } = useSnackbar();
  const handleSubmitForm = async (data) => {
    try {
      const isCheck = await checkUserIsExist({ email: data.email });
      if (!isCheck) {
        const response = await register(data);
        console.log("res", response);
        if (response.data.status === 201) {
          enqueueSnackbar("Add User Success!!!!!!", {
            variant: "success",
            autoHideDuration: 2000,
            anchorOrigin: { vertical: "top", horizontal: "right" },
          });
          handleClose();
          loadData();
        }
      } else {
        enqueueSnackbar("Email is existed!!!!!!", {
          variant: "error",
          autoHideDuration: 2000,
          anchorOrigin: { vertical: "top", horizontal: "right" },
        });
      }
    } catch (error) {
      console.log("error", error);
    }
  };
  return (
    <div>
      <AddUserForm handleSubmitForm={handleSubmitForm} />
    </div>
  );
};

export default AddUser;
