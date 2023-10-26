import { Box, Button, Typography, Link } from "@mui/material";
import React from "react";
import { useSelector } from "react-redux";
import { NavLink } from "react-router-dom";

function NotFound({ src, message }) {
  const user = useSelector((state) => state.users.currentUser);
  return (
    <Box sx={{ textAlign: "center", mt: "60px" }}>
      <Box component="img" src={src} alt="" />
      <Typography variant="h4">
        404: The page you are looking for isn’t here
      </Typography>
      <Link
        component={NavLink}
        to={user.role === 1 ? "/admin" : "/"}
        sx={{ fontSize: "16px", display: "block", marginTop: "20px" }}
      >
        Back to home
      </Link>
    </Box>
  );
}

export default NotFound;
