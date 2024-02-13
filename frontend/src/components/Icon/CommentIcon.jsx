import React from "react";
import { Grid, Typography, IconButton } from "@mui/material"; // Import necessary MUI components
import CommentIcon from "@mui/icons-material/Comment";

function CommentIconComponent({ commentCount = "6" }) {
  return (
    <>
      <Grid>
        <IconButton>
          <CommentIcon color="action" />
        </IconButton>
      </Grid>
      <Grid>
        <Typography variant="body2" color="textSecondary">
          {commentCount}
        </Typography>
      </Grid>
    </>
  );
}

export default CommentIconComponent;
