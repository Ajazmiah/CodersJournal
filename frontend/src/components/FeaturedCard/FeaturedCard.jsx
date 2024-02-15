import React from "react";
import Styles from "./FeaturedCard.module.css";
import classNames from "classnames";
import { Box, Grid } from "@mui/material";
import { useLink } from "../../hooks/useLInk/useLink";
import Image from "../Image/Image";

function FeaturedCard({ post }) {


  const {handleNavigateToPost} = useLink()

  return (
    <Grid
      onClick={() => handleNavigateToPost(post)}
      container
      spacing={1}
      className={classNames(Styles.featuredCard, Styles.card)}
    >
      <Grid
        item
        container
        sx={{
          flexBasis: "65%",
        }}
      >
       <Box>
        <h1 className={classNames(Styles.featuredTitle)}>{post.title}</h1>
        <p className={Styles.summary}>{post.summary ? post.summary : 'Summary is not available'}</p>
        <span>{"January , 2023"}</span>
       </Box>
      </Grid>

      <Grid
        item
        className={Styles.FeaturedImage}
        sx={{
          flexBasis: "25%",
        }}
      >
       <Image 
        // src={post.cover} 
        alt={post?.alt || 'cover photo of the post'} 
        loading='eager'
      />
      </Grid>
    </Grid>
  );
}

export default FeaturedCard;
