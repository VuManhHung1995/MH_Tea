import { IconButton, Typography } from "@mui/material";
import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";

import BlockIcon from "@mui/icons-material/Block";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import { deleteUser } from "../../../../api/userApi";
import AlertDialog from "../../componnents/AlertDialog";

import { enqueueSnackbar } from "notistack";
import { useState } from "react";
import FormDialog from "../Dialog";

export default function TableUser({ listUser, loadData }) {
  const [open, setOpen] = useState(false);
  const [deleteId, setDeleteId] = useState(null);
  const [editId, setEditId] = useState(null);
  const [openEdit, setOpenEdit] = useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleClickOpenEdit = () => {
    setOpenEdit(true);
  };

  const handleCloseEdit = () => {
    setOpenEdit(false);
  };
  const handleDeleteUser = (id) => {
    handleClickOpen();
    setDeleteId(id);
  };
  const handleClickDelete = async () => {
    try {
      const result = await deleteUser(deleteId);
      if (!result) {
        enqueueSnackbar("User isn't exist!!!!!!", {
          variant: "error",
          autoHideDuration: 2000,
          anchorOrigin: { vertical: "top", horizontal: "right" },
        });
        handleClose();
        loadData();
      } else {
        if (result.data.status === 200) {
          enqueueSnackbar(result.data.userMsg, {
            anchorOrigin: { horizontal: "right", vertical: "top" },
            autoHideDuration: 2000,
            variant: "success",
          });
          handleClose();
          loadData();
        }
      }
    } catch (error) {
      console.log(error);
    }
  };
  const handleEditUser = (id) => {
    handleClickOpenEdit();
    setEditId(id);
  };
  return (
    <TableContainer component={Paper}>
      <Table
        sx={{ minWidth: 650 }}
        stickyHeader={true}
        aria-label="sticky table"
      >
        <TableHead sx={{ fontWeight: "bold" }}>
          <TableRow>
            <TableCell>STT</TableCell>
            <TableCell>FirstName</TableCell>
            <TableCell>LastName</TableCell>
            <TableCell>Email</TableCell>
            <TableCell>Role</TableCell>
            <TableCell>Status</TableCell>
            <TableCell sx={{ textAlign: "center" }}>Option</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {listUser.map((row, index) => (
            <TableRow
              key={row.userId}
              sx={{
                "&:last-child td, &:last-child th": { border: 0 },
                "&:hover": { cursor: "pointer" },
              }}
              hover
            >
              <TableCell component="th" scope="row">
                {index + 1}
              </TableCell>
              <TableCell>{row.firstName}</TableCell>
              <TableCell>{row.lastName}</TableCell>
              <TableCell>{row.email}</TableCell>
              <TableCell>{row.role === 0 ? "User" : "Admin"}</TableCell>
              <TableCell
                sx={{
                  maxWidth: "150px",
                  overflow: "hidden",
                  textOverflow: "ellipsis",
                }}
              >
                {row.status === 0 ? (
                  <Typography
                    component="span"
                    sx={{
                      display: "inline-block",
                      bgcolor: "rgba(34, 197, 94, 0.16)",
                      color: "rgb(17, 141, 87);",
                      padding: "4px 8px",
                      fontSize: "12px",
                      borderRadius: "8px",
                    }}
                  >
                    Active
                  </Typography>
                ) : (
                  <Typography
                    component="span"
                    sx={{
                      display: "inline-block",
                      bgcolor: "rgba(255, 86, 48, 0.16)",
                      color: "rgb(183, 29, 24)",
                      padding: "4px 8px",
                      fontSize: "12px",
                      borderRadius: "8px",
                    }}
                  >
                    Banned
                  </Typography>
                )}
              </TableCell>
              <TableCell sx={{ width: "180px", textAlign: "center" }}>
                <IconButton
                  aria-label="delete"
                  color="default"
                  onClick={() => handleDeleteUser(row.userCode)}
                >
                  <DeleteIcon />
                </IconButton>
                <IconButton
                  aria-label="edit"
                  color="primary"
                  onClick={() => handleEditUser(row.userCode)}
                >
                  <EditIcon />
                </IconButton>
                <IconButton aria-label="block" color="error">
                  <BlockIcon />
                </IconButton>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      <AlertDialog
        open={open}
        handleClose={handleClose}
        handleClickDelete={handleClickDelete}
        message="Are you sure you want to this user?"
      />
      <FormDialog
        mode="edit"
        open={openEdit}
        handleClose={handleCloseEdit}
        editId={editId}
        loadData={loadData}
      />
    </TableContainer>
  );
}
