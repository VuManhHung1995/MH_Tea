import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import * as React from "react";

export default function AlertDialog({
  open,
  handleClose,
  handleClickDelete,
  message,
}) {
  return (
    <Dialog open={open} onClose={handleClose}>
      <DialogTitle sx={{ fontWeight: "bold", minWidth: "450px" }}>
        {"Delete"}
      </DialogTitle>
      <DialogContent>
        <DialogContentText>{message}</DialogContentText>
      </DialogContent>
      <DialogActions sx={{ padding: "0px 16px 16px 0px" }}>
        <Button
          onClick={handleClickDelete}
          sx={{
            bgcolor: "rgb(255, 86, 48)",
            "&:hover": { bgcolor: "rgba(255, 86, 48, 0.8)" },
            color: "white",
            fontSize: "12px",
            borderRadius: "8px",
            padding: "8px 12px ",
            textTransform: "none",
          }}
        >
          Delete
        </Button>
        <Button
          onClick={handleClose}
          sx={{
            bgcolor: "white",
            "&:hover": { bgcolor: "rgba(255, 255, 255, 0.8)" },
            color: "black",
            fontSize: "12px",
            borderRadius: "8px",
            padding: "8px 12px ",
            textTransform: "none",
            border: "1px solid #ccc",
          }}
        >
          Cancle
        </Button>
      </DialogActions>
    </Dialog>
  );
}
