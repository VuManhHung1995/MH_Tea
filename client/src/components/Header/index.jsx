import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import FreeBreakfastIcon from "@mui/icons-material/FreeBreakfast";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";

import {
  Avatar,
  Badge,
  Box,
  IconButton,
  Link,
  Typography,
} from "@mui/material";
import React from "react";
import { useSelector } from "react-redux";
import { NavLink, useNavigate } from "react-router-dom";
import AccountMenu from "../AccountMenu";

function Header() {
  const navigate = useNavigate();
  const user = useSelector((state) => state.users.currentUser);
  const cart = useSelector((state) => state.carts.cart);
  const menu = ["Cà phê", "Trà", "Bánh ngọt", "Bài viết"];
  return (
    <Box
      sx={{
        height: "60px",
        position: "fixed",
        top: 0,
        left: user.role === 1 ? "280px" : 0,
        right: 0,
        bgcolor: "rgba(255, 255, 255, 0.8)",
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        padding: "0 30px",
        borderBottom: "1px solid #00000026;",
        zIndex: 1000,
      }}
    >
      <Box sx={{ display: "flex", alignItems: "center" }}>
        {user.role === 1 ? (
          <></>
        ) : (
          <>
            <FreeBreakfastIcon sx={{ mr: "8px", color: "rgb(0, 167, 111)" }} />
            <Typography
              sx={{ fontSize: "20px", "&:hover": { cursor: "pointer" } }}
              onClick={() => {
                user.role === 1 ? navigate("/admin") : navigate("/");
              }}
            >
              MH Tea
            </Typography>
          </>
        )}
      </Box>
      <Box component="ul" sx={{ display: "flex", listStyle: "none" }}>
        {user.role === 1 ? (
          <></>
        ) : (
          <>
            {menu.map((item, index) => (
              <Link
                component={NavLink}
                key={index}
                sx={{
                  textDecoration: "none",
                  color: "#000",
                  padding: " 0 16px",
                  fontWeight: "500",
                  "&:hover": { color: "rgb(0, 167, 111)" },
                }}
              >
                {item}
              </Link>
            ))}
          </>
        )}
      </Box>
      <Box sx={{ display: "flex", alignItems: "center" }}>
        {user.role || user.role === 0 ? (
          <AccountMenu
            avata={
              <Avatar
                sx={{
                  bgcolor: "rgba(34, 197, 94, 0.8)",
                }}
              >
                {user.firstName[0].toUpperCase()}
              </Avatar>
            }
            user={user}
          />
        ) : (
          <AccountMenu avata={<AccountCircleIcon />} user={user} />
        )}

        {user?.role === 0 ? (
          <IconButton
            size="large"
            aria-label="show 17 new notifications"
            color="inherit"
            onClick={() => navigate("/cart")}
          >
            <Badge badgeContent={cart?.length} color="error">
              <ShoppingCartIcon
                onClick={() => {
                  navigate("/cart");
                }}
              />
            </Badge>
          </IconButton>
        ) : (
          <></>
        )}
      </Box>
    </Box>
  );
}

export default Header;
