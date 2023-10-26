import Dialog from "@mui/material/Dialog";
import * as React from "react";
import AddUser from "../AddUser";
import EditUser from "../EditUser";

export default function FormDialog({
  handleClose,
  open,
  mode,
  editId,
  loadData,
}) {
  return (
    <div>
      <Dialog open={open} onClose={handleClose} disableEscapeKeyDown>
        {mode === "add" && (
          <AddUser handleClose={handleClose} loadData={loadData} />
        )}
        {mode === "edit" && (
          <EditUser
            handleClose={handleClose}
            editId={editId}
            loadData={loadData}
          />
        )}
      </Dialog>
    </div>
  );
}
