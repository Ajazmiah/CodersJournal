import React, { useState , useContext} from "react";
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

  const [openModal, setOpenModal2] = useState(false)
 

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



  React.useEffect(() => {
    setOpenBackdrop(openModal)
  }, openModal)
  return (
    <Box className="pageContainer space-top-5" container sx={{
      width: {
        xs: 400, // Width for extra small screens and up
        sm: 500, // Width for small screens and up
        md: 600, // Width for medium screens and up
        lg: 900, // Width for large screens and up
        xl: 1200, // Width for extra large screens and up
        // You can define more breakpoints and widths as needed
      },
    }}>
      {openModal && 
       <Backdrop>
         <ModalRectangular>
          <Typography sx={{ marginBottom: '5px' }}>Are you sure you want to delete this post</Typography>
          <Grid container spacing={2}>
            <Grid item>
              <Button variant="contained" onClick={handleApproveDeletion}>Confirm</Button>
            </Grid>
            <Grid item>
              <Button variant="contained" onClick={() => setOpenModal2(false)} sx={{ backgroundColor: 'red' }}>Cancel</Button>
            </Grid>
          </Grid>
        </ModalRectangular>
       </Backdrop>
      }
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
               {post?._doc.authorId === userInfo?._id && <Button onClick={() => setOpenModal2(true)}>Delete</Button>}

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
