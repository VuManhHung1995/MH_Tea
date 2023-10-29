import { Box, Button, Typography } from "@mui/material";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import React from "react";
import { useNavigate } from "react-router-dom";

function OrderSuccess() {
  const navigate = useNavigate();
  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        mt: "60px",
        flexDirection: "column",
        bgcolor: "white",
        mb: "-50px",
      }}
      style={{ minHeight: "calc(100vh - 300px" }}
      width="100vw"
    >
      <Box
        component="img"
        width="200px"
        src="https://s3.amazonaws.com/pix.iemoji.com/images/emoji/apple/ios-12/256/party-popper.png"
      />
      <Typography sx={{ fontWeight: "bold", fontSize: "30px", m: "10px" }}>
        Your order is complete!
      </Typography>
      <Typography>
        You will be receiving a confirmation email with order details.
      </Typography>
      <Button
        variant="outlined"
        startIcon={<ChevronLeftIcon />}
        onClick={() => navigate("/")}
        sx={{
          bgcolor: "rgb(0, 167, 111)",
          color: "white",
          p: "10px",
          mt: "20px",
          ":hover": {
            outline: "none",
            bgcolor: "rgb(0,167,111,0.8)",
            color: "white",
          },
        }}
      >
        Continue Shopping
      </Button>
    </Box>
  );
}

export default OrderSuccess;
