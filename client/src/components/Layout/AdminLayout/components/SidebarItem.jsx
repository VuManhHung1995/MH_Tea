import { Box, Typography } from "@mui/material";
import React from "react";
import { Link } from "react-router-dom";

function SidebarItem({ name, icon, path, isFocus, handleOnclick, sideBarKey }) {
  return (
    <div>
      <Box
        component={Link}
        to={path}
        sx={{
          display: "flex",
          padding: "8px 0",
          "&:hover": {
            bgcolor: "rgba(145, 158, 171, 0.08)",
            cursor: "pointer",
          },
          color: "rgb(99, 115, 129)",
          borderRadius: "8px",
          bgcolor: isFocus ? "rgba(0, 167, 111, 0.1)" : "",
          margin: "4px 0",
          textDecoration: "none",
        }}
        onClick={() => handleOnclick(sideBarKey)}
      >
        <Box sx={{ margin: " 0 8px" }}>{icon}</Box>
        <Typography
          sx={{
            fontSize: "14px",
          }}
        >
          {name}
        </Typography>
      </Box>
    </div>
  );
}

export default SidebarItem;
