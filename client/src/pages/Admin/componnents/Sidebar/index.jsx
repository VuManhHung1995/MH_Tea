import { Box, Link } from "@mui/material";
import React from "react";
import SidebarItem from "../SidebarItem";
import PersonIcon from "@mui/icons-material/Person";
import LocalMallIcon from "@mui/icons-material/LocalMall";
import { NavLink } from "react-router-dom";

function Sidebar() {
  return (
    <Box
      sx={{
        width: "250px",
        paddingTop: "12px",
        borderRight: "1px dashed rgba(145, 158, 171, 0.2);",
        height: "calc(100vh - 64px)",
      }}
    >
      <Link
        to="/management"
        component={NavLink}
        sx={{ textDecoration: "none", color: "black" }}
      >
        <SidebarItem name="User" icon={<PersonIcon />} />
      </Link>
      <Link
        to="/management/product"
        component={NavLink}
        sx={{ textDecoration: "none", color: "black" }}
      >
        <SidebarItem name="Product" icon={<LocalMallIcon />} />
      </Link>
    </Box>
  );
}

export default Sidebar;
