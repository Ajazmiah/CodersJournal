import * as React from "react";
import CardHeader from "@mui/material/CardHeader";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import { formatDate } from "../../utils";
import CardTheme from "./PostCardTheme";
import { Button, Container, Grid } from "@mui/material";
import LikeCommentComponent from "../Icon/LikeComment";
import {useLink} from "../../hooks/useLInk/useLink"
import AuthorBylineCard from "../AuthorBylineCard/AuthorBylineCard";

function PostCard({ posts }) {

  console.log("BYLINE POSTS", posts)

  const {handleNavigateToPost} = useLink()
  return (
    posts && (
      <Grid container spacing={4}>
        
        {posts.map((post) => (
          <Grid key={post._id} item xs={12} md={4} sm={12}>
            
            <CardTheme>
              <CardContent onClick={() => handleNavigateToPost(post)}>
                <CardHeader
                  sx={{ padding: "0", paddingTop: "5px" }}
                  title={post?.title}
                  subheader={formatDate(post?.createdAt)}
                />
                <AuthorBylineCard author={post.authorId} />
                <Typography
                  variant="body2"
                  marginTop={"5px"}
                  color="text.secondary"
                >
                 {post.summary}
                </Typography>
              </CardContent>
            </CardTheme>
            <Container sx={{ marginTop: "20px" }}>
              <LikeCommentComponent /> 
              {/* {post.authorId && <Button onClick={() => alert(post._id)}>Delete</Button>} */}
            </Container>
          </Grid>
        ))}
      </Grid>
    )
  );
}

export default PostCard;
