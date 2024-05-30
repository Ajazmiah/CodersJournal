import React, { useState , useContext, useEffect} from "react";
import ReactHtmlParser from "html-react-parser";
import DOMPurify from "dompurify";
import { Box, Typography, Button, Grid } from "@mui/material";
import { useParams, useNavigate } from "react-router-dom";

import { useGetPostMutation } from "../../slices/postsApiSlice";
import { toast } from "react-toastify";
import { formatDate } from "../../utils";
import AuthorBylineCard from "../../components/AuthorBylineCard/AuthorBylineCard";
import { useDeletePostMutation } from "../../slices/postsApiSlice";
import ModalRectangular from "../../components/Modal/ModalRectangular";
import { backdropContext } from "../../context/backdropContext";
import { useSelector } from "react-redux";
import Backdrop from "../../components/Backdrop/Backdrop";


function SingleBlogScreen() {
  const { id } = useParams();
  const [getPost] = useGetPostMutation();

  const [isBackdropOpen, setOpenBackdrop] = useContext(backdropContext)
  const { userInfo } = useSelector((state) => state.auth);


  const [openModal, setOpenModal] = useState(false)

 

  const [deletePost] = useDeletePostMutation()
  const navigate = useNavigate();

  const [post, setPost] = useState(null);
  

  const sanitizedHTML = DOMPurify.sanitize(post?._doc?.body);
 
  const POST = ReactHtmlParser(sanitizedHTML);
  console.log("SANITIZED" , POST)
  React.useEffect(() => {
    const fetchPost = async () => {
      try {
        const post = await getPost({ id }).unwrap();
        setPost(post);
        console.log("SINGLE POST", post)
      
      } catch (err) {
        toast.error("Something went wrong please try again!");
      }
    };

    fetchPost();
  }, []);


  const handleApproveDeletion = async () => {
    setOpenModal2(false)

    try {
      const deleted = await deletePost({ id }).unwrap()
      toast.success("Post is deleted")
      navigate('/')

    } catch (err) {
      toast.error(err)
    }

  }

  //setOpenModal


  const handleCancel = (e) => {

  console.log(e.target.className)
    setOpenModal(false)
  }




  return (
    <Box className="container space-top-5">

    
    

       {openModal ?  <Backdrop>
        <ModalRectangular>
          <Typography sx={{ marginBottom: '5px' }}>Are you sure you want to delete this post</Typography>
          <Grid container spacing={2}>
            <Grid item>
              <Button variant="contained" onClick={handleApproveDeletion}>Confirm</Button>
            </Grid>
            <Grid item>
              <Button variant="contained" onClick={handleCancel} sx={{ backgroundColor: 'red' }}>Cancel</Button>
            </Grid>
          </Grid>
        </ModalRectangular>
       </Backdrop>
: null}
      
      {post && (
        <>
          <Box>
            <Typography variant="h2">{post._doc.title}</Typography>
            <Box sx={{ marginLeft: "10px" }}>
              <Typography
                variant="body1"
                sx={{ marginTop: "10px", color: "#777575", fontSize: "20px" }}
              >
                {post._doc.summary}
              </Typography>

              <Typography>{formatDate(post?.createdAt)}</Typography>
               {post?._doc.authorId === userInfo?._id && <Button onClick={() => setOpenModal(true)}>Delete</Button>}

              <AuthorBylineCard author={post.author} />
            </Box>
            <Box className="space-top-7">{POST}</Box>;
          </Box>
        </>
      )}
    </Box>
  );
}

export default SingleBlogScreen;
