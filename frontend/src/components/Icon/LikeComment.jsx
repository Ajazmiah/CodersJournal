import React from "react";
import { Grid } from "@mui/material";
import CommentIconComponent from "./CommentIcon";
import LikeIconComponent from "./LikeIcon";

function LikeCommentComponent({ likeCount = "4", commentCount = "4" }) {
  return (
    <Grid container spacing={2} alignItems="cnter">
      <LikeIconComponent likeCount={likeCount} />
      <CommentIconComponent commentCount={commentCount} />
    </Grid>
  );
}

export default LikeCommentComponent;
