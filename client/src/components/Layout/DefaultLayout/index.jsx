import { Box } from "@mui/material";
import React from "react";
import Header from "../../Header";
import Footer from "../../Footer";

function DefaultLayout({ children }) {
  return (
    <Box>
      <Header />
      {children}
      <Footer />
    </Box>
  );
}

export default DefaultLayout;
