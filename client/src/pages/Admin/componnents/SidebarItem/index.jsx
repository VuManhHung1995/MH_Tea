import { Box, Typography } from "@mui/material";
import React from "react";
function SidebarItem({ name, icon }) {
  return (
    <Box
      sx={{
        display: "flex",
        padding: "8px",
        "&:hover": { bgcolor: "white", cursor: "pointer" },
      }}
    >
      <Box sx={{ mr: "8px" }}>{icon}</Box>
      <Typography>{name}</Typography>
    </Box>
  );
}

export default SidebarItem;
