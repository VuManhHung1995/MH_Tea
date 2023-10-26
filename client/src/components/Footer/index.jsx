import { Box, Grid, Typography } from "@mui/material";
import React from "react";
import FacebookIcon from "@mui/icons-material/Facebook";
import TwitterIcon from "@mui/icons-material/Twitter";
import YouTubeIcon from "@mui/icons-material/YouTube";
import InstagramIcon from "@mui/icons-material/Instagram";

function Footer() {
  return (
    <Box
      sx={{
        bgcolor: "#000000D9",
        pt: "30px",
        pb: "50px",
        mt: "50px",
        color: "white",
        display: "flex",
        justifyContent: "center",
      }}
    >
      <Grid container sx={{ width: "1200px" }}>
        <Grid item xs={3}>
          <Typography component="h3" fontSize="16px">
            Giới thiệu
          </Typography>
          <Typography component="ul" sx={{ listStyleType: "none", mt: "16px" }}>
            <Typography component="li" variant="body2" sx={{ mt: "8px" }}>
              Về chúng tôi
            </Typography>
            <Typography component="li" variant="body2" sx={{ mt: "8px" }}>
              Sản phẩm
            </Typography>
            <Typography component="li" variant="body2" sx={{ mt: "8px" }}>
              Khuyến mãi
            </Typography>
            <Typography component="li" variant="body2" sx={{ mt: "8px" }}>
              Cửa hàng
            </Typography>
            <Typography component="li" variant="body2" sx={{ mt: "8px" }}>
              Tuyển dụng
            </Typography>
          </Typography>
        </Grid>
        <Grid item xs={3}>
          <Typography component="h3" fontSize="16px">
            Điều khoản
          </Typography>
          <Typography component="ul" sx={{ listStyleType: "none", mt: "16px" }}>
            <Typography component="li" variant="body2" sx={{ mt: "8px" }}>
              Điều khoản sử dụng
            </Typography>
            <Typography component="li" variant="body2" sx={{ mt: "8px" }}>
              Chính sách bảo mật thông tin
            </Typography>
          </Typography>
        </Grid>
        <Grid item xs={3}>
          <Typography component="h3" fontSize="16px">
            Chăm sóc khách hàng
          </Typography>
          <Typography component="ul" sx={{ listStyleType: "none", mt: "16px" }}>
            <Typography component="li" variant="body2" sx={{ mt: "8px" }}>
              Trung tâm chăm sóc
            </Typography>
            <Typography component="li" variant="body2" sx={{ mt: "8px" }}>
              Chính sách hoàn trả
            </Typography>
          </Typography>
        </Grid>
        <Grid item xs={3}>
          <Typography component="h3" fontSize="16px">
            Liên hệ
          </Typography>
          <Typography component="ul" sx={{ listStyleType: "none", mt: "16px" }}>
            <Typography component="li" variant="body2" sx={{ mt: "8px" }}>
              Thanh Xuân, Hà Nội, Việt Nam
            </Typography>
            <Typography component="li" variant="body2" sx={{ mt: "8px" }}>
              Email: mhtea@gmail.com
            </Typography>
            <Typography component="li" variant="body2" sx={{ mt: "8px" }}>
              Phone: 0123456789
            </Typography>
            <Box sx={{ mt: "8px" }}>
              <FacebookIcon sx={{ mr: "8px" }} />
              <TwitterIcon sx={{ mr: "8px" }} />
              <YouTubeIcon sx={{ mr: "8px" }} />
              <InstagramIcon />
            </Box>
          </Typography>
        </Grid>
      </Grid>
    </Box>
  );
}

export default Footer;
