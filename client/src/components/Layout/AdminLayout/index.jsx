import React from "react";
import Header from "../../Header";
import { Box } from "@mui/material";
import Sidebar from "./components/Sidebar";

function AdminLayout({ children }) {
  return (
    <Box>
      <Sidebar />
      <Box>
        <Header />
        {children}
      </Box>
    </Box>
  );
}

export default AdminLayout;
