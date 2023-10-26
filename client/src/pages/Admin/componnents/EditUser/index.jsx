import { useSnackbar } from "notistack";
import React from "react";
import { editUser } from "../../../../api/userApi";
import EditFormUser from "../EditUserForm";

const EditUser = ({ handleClose, editId, loadData }) => {
  const { enqueueSnackbar } = useSnackbar();
  const handleSubmitForm = async (data, userCode) => {
    try {
      const reponse = await editUser(data, userCode);
      if (!reponse) {
        enqueueSnackbar("User isn't exist!!!!!!", {
          variant: "error",
          autoHideDuration: 2000,
          anchorOrigin: { vertical: "top", horizontal: "right" },
        });
        handleClose();
        loadData();
      } else {
        if (reponse.data.status === 200) {
          enqueueSnackbar("Update User Success!!!!!!", {
            variant: "success",
            autoHideDuration: 2000,
            anchorOrigin: { vertical: "top", horizontal: "right" },
          });
          handleClose();
          loadData();
        }
      }
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div>
      <EditFormUser handleSubmitForm={handleSubmitForm} editId={editId} />
    </div>
  );
};

export default EditUser;
