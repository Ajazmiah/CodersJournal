import React from "react";
import { Grid, Typography, IconButton } from "@mui/material"; // Import necessary MUI components
import CommentIcon from "@mui/icons-material/Comment";
import ThumbUpIcon from "@mui/icons-material/ThumbUp";

function LikeIcon({ likeCount }) {
  return (
    <>
      <Grid>
        <IconButton>
          <ThumbUpIcon color="primary" />
        </IconButton>
      </Grid>
      <Grid>
        <Typography variant="body2" color="secondary">
          {likeCount}
        </Typography>
      </Grid>
    </>
  );
}

export default LikeIcon;
