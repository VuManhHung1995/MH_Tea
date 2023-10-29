import AddIcon from "@mui/icons-material/Add";
import { Box, Button, OutlinedInput, Paper, Typography } from "@mui/material";
import queryString from "query-string";
import React, { useEffect, useMemo, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { getAllUser } from "../../api/userApi";
import FormDialog from "../Admin/componnents/Dialog";
import Pagination from "../Admin/componnents/Pagination";
import TableUser from "../Admin/componnents/TableUser";

function UserManagement() {
  const location = useLocation();
  const navigate = useNavigate();

  const [open, setOpen] = useState(false);
  const queryParams = useMemo(() => {
    const params = queryString.parse(location.search);
    return {
      ...params,
      page: Number.parseInt(params.page) ? Number.parseInt(params.page) : 1,
      pageSize: Number.parseInt(params.pageSize)
        ? Number.parseInt(params.pageSize)
        : 10,
    };
  }, [location.search]);
  const [listUser, setListUser] = useState([]);
  const [count, setCount] = useState(0);
  useEffect(() => {
    loadData();
  }, [queryParams]);

  const loadData = async () => {
    try {
      const listUser = await getAllUser(queryParams);
      setListUser(listUser.data.data);
      setCount(listUser.data.count);
    } catch (error) {
      console.log(error);
    }
  };

  const handleChangeNameSearch = (e) => {
    const nameSearch = e.target.value;
    const filters = {
      ...queryParams,
      nameSearch,
    };

    navigate({
      pathname: "/admin",
      search: queryString.stringify(filters),
    });
  };
  const handleChangePagination = (newParams) => {
    const paramsString = queryString.stringify(newParams);
    navigate({
      pathname: "/admin",
      search: paramsString,
    });
  };
  const handleOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };
  return (
    <Box sx={{ flex: 1, ml: "320px", mr: "40px", mt: "80px" }}>
      <Box sx={{ display: "flex", justifyContent: "space-between" }}>
        <Typography variant="h5">User</Typography>
        <Button
          variant="contained"
          onClick={handleOpen}
          sx={{
            textTransform: "none",
            bgcolor: "rgb(33, 43, 54)",
            "&:hover": { bgcolor: "rgba(33, 43, 54, 0.8)" },
          }}
        >
          <AddIcon />
          New User
        </Button>
      </Box>
      <Paper variant="0" sx={{ padding: "20px 10px", mt: "20px" }}>
        <OutlinedInput
          placeholder="Enter keyword to search user"
          size="small"
          sx={{ width: "50%", fontSize: "14px" }}
          onChange={handleChangeNameSearch}
          value={queryParams.nameSearch}
        />
      </Paper>
      <Paper
        variant="0"
        sx={{
          mt: "20px",
          // height: "330px",
          // overflow: "scroll",
          // "&::-webkit-scrollbar": { display: "none" },
        }}
      >
        <TableUser listUser={listUser} loadData={loadData} />
      </Paper>
      <Paper>
        <Pagination
          count={count}
          onChange={handleChangePagination}
          queryParams={queryParams}
        />
      </Paper>
      <FormDialog
        handleClose={handleClose}
        open={open}
        mode="add"
        loadData={loadData}
      />
    </Box>
  );
}

export default UserManagement;
