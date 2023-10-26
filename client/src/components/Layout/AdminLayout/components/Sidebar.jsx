import AccountBoxIcon from "@mui/icons-material/AccountBox";
import FreeBreakfastIcon from "@mui/icons-material/FreeBreakfast";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import LocalMallIcon from "@mui/icons-material/LocalMall";
import { Box, Typography } from "@mui/material";
import React, { useState } from "react";
import { useLocation } from "react-router-dom";
import SidebarItem from "./SidebarItem";

function Sidebar() {
  const sideBarList = [
    { name: "User", icon: <AccountBoxIcon />, path: "/admin" },
    { name: "Product", icon: <LocalMallIcon />, path: "/admin/product" },
    { name: "Order", icon: <ShoppingCartIcon />, path: "/admin/order" },
  ];
  const location = useLocation();
  const [sideBarCliked, setSideBarIsclicked] = useState(() => {
    const path = location.pathname;
    const sideBarClicked = sideBarList.find((sidebar) => {
      if (sidebar.path !== "/admin") {
        return path.includes(sidebar.path);
      } else {
        return path === sidebar.path;
      }
    });
    return sideBarClicked.name;
  });
  const handleOnclick = (sideBarKey) => {
    setSideBarIsclicked(sideBarKey);
  };
  return (
    <Box
      sx={{
        position: "fixed",
        top: 0,
        bottom: 0,
        left: 0,
        width: "280px",
        borderRight: "1px dashed rgba(145, 158, 171, 0.2);",
        padding: " 0 16px ",
      }}
    >
      <Box sx={{ display: "flex", alignItems: "center", padding: "16px 0" }}>
        <FreeBreakfastIcon sx={{ mr: "8px", color: "rgb(0, 167, 111)" }} />
        <Typography sx={{ fontSize: "20px" }}>MH Tea</Typography>
      </Box>
      {sideBarList.map((item, index) => (
        <SidebarItem
          name={item.name}
          icon={item.icon}
          key={index}
          path={item.path}
          sideBarKey={item.name}
          handleOnclick={handleOnclick}
          isFocus={sideBarCliked === item.name ? true : false}
        />
      ))}
    </Box>
  );
}

export default Sidebar;
