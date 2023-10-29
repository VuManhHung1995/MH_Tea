import { Avatar, Box, Grid, Typography } from "@mui/material";
import React from "react";

function Comment({ comment }) {
  const date = new Date(comment.createDate);
  return (
    <Grid item xs={12} sx={{ display: "flex" }}>
      <Avatar>{comment.firstName[0].toUpperCase()}</Avatar>
      <Box
        sx={{
          ml: "15px",
          borderBottom: "1px solid rgba(145, 158, 171, 0.2);",
          pb: "30px",
        }}
        flex={1}
      >
        <Typography sx={{ fontWeight: 600, fontSize: "14px", mb: "6px" }}>
          {`${comment.firstName} ${comment.lastName}`}
        </Typography>
        <Typography
          sx={{
            fontWeight: 400,
            color: "rgb(145, 158, 171)",
            fontSize: "12px",
          }}
        >
          {`${date.getFullYear()} ${
            date.getMonth() + 1 < 10
              ? `0${date.getMonth() + 1}`
              : date.getMonth() + 1
          } ${date.getDate() < 10 ? `0${date.getDate()}` : date.getDate()}`}
        </Typography>
        <Typography sx={{ fontWeight: 400, fontSize: "14px", mt: "6px" }}>
          {comment.content}
        </Typography>
      </Box>
    </Grid>
  );
}

export default Comment;
