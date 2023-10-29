import { Box, IconButton, Switch, Typography } from "@mui/material";
import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";

import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import { deleteProduct } from "../../../../api/productApi";
import AlertDialog from "../../componnents/AlertDialog";

import { enqueueSnackbar } from "notistack";
import { useState } from "react";

import { convertBufferToBase64 } from "../../../../common-function/getBase64";
import { useNavigate } from "react-router-dom";

export default function TableProduct({ listProduct, loadData }) {
  const [open, setOpen] = useState(false);
  const [deleteId, setDeleteId] = useState(null);
  const navigate = useNavigate();

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleDeleteUser = (id) => {
    handleClickOpen();
    setDeleteId(id);
  };
  const handleClickDelete = async () => {
    try {
      const result = await deleteProduct(deleteId);
      if (!result) {
        enqueueSnackbar("Product isn't exist!!!!!!", {
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
  return (
    <TableContainer component={Paper}>
      <Table
        sx={{ minWidth: 650 }}
        stickyHeader={true}
        aria-label="sticky table"
      >
        <TableHead sx={{ fontWeight: "bold" }}>
          <TableRow>
            <TableCell>Product Name</TableCell>
            <TableCell>Category</TableCell>
            <TableCell>Price</TableCell>
            <TableCell>Published</TableCell>
            <TableCell sx={{ textAlign: "center" }}>Option</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {listProduct.map((row, index) => (
            <TableRow
              key={row.productCode}
              sx={{
                "&:last-child td, &:last-child th": { border: 0 },
                "&:hover": { cursor: "pointer" },
              }}
              hover
            >
              <TableCell sx={{ display: "flex", alignItems: "center" }}>
                <Box
                  component="img"
                  src={convertBufferToBase64(row.srcImage)}
                  sx={{
                    width: "50px",
                    height: "50px",
                    borderRadius: "12px",
                    mr: "10px",
                  }}
                />
                <Typography sx={{ fontSize: "13px" }}>
                  {row.productName}
                </Typography>
              </TableCell>
              <TableCell>{row.categoryName}</TableCell>
              <TableCell>
                {new Intl.NumberFormat("vi-VN", {
                  style: "currency",
                  currency: "VND",
                }).format(row.price)}
              </TableCell>
              <TableCell>
                <Switch checked={row.publish === 0 ? false : true} />
              </TableCell>
              <TableCell sx={{ width: "180px", textAlign: "center" }}>
                <IconButton
                  aria-label="delete"
                  color="default"
                  onClick={() => handleDeleteUser(row.productCode)}
                >
                  <DeleteIcon />
                </IconButton>
                <IconButton
                  aria-label="edit"
                  color="primary"
                  onClick={() => {
                    navigate(`/admin/product/edit/${row.productCode}`);
                  }}
                >
                  <EditIcon />
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
        message="Are you sure you want to this product?"
      />
    </TableContainer>
  );
}
