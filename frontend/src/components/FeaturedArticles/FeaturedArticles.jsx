import React, { useEffect , useState} from "react";
import LeadArticle from "../LeadArticle/LeadArticle";
import { Box, Grid } from "@mui/material";
import FeaturedCard from "../FeaturedCard/FeaturedCard";
import { useGetMorePostOnScrollMutation } from "../../slices/postsApiSlice";

function FeaturedArticles() {


  const [getPosts] = useGetMorePostOnScrollMutation();

  const [posts ,setPosts]  = useState(null)
  

  useEffect(() => {
   
    const getAllPosts = async () => {
      try {
        const allPost = await getPosts().unwrap();
        
        setPosts(allPost)
        console.log("HOME", allPost)
      } catch (error) {
        console.log("ERROR", error)
      }
    }

    getAllPosts();

  }, [])


if(!posts) return


const modifiedPosts = posts.map(post => {
  if(!post.cover) {
    return {
      ...post,
      cover: 'https://as1.ftcdn.net/v2/jpg/02/48/42/64/1000_F_248426448_NVKLywWqArG2ADUxDq6QprtIzsF82dMF'
    }
  }
  return post
})


  return (
    <Grid container sx={{ justifyContent: "space-evenly", flexDirection: { xs: 'column', md: 'row' } }}>
      <Grid item xs={12} lg={6} sx={{ marginBottom: '50px' }}>
        <LeadArticle post={modifiedPosts[0]} />
      </Grid>
      <Grid
        item
        xs={12}
        lg={5}
        sx={{
          display: "flex",
          gap: "20px",
          flexDirection: "column",
        }} 
      >
        {modifiedPosts.slice(0,3).map((post) => (
           <FeaturedCard key={post._id} post={post} />
          
        ))}
      </Grid>
     </Grid>
  );
}

export default FeaturedArticles;
