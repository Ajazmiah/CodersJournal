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
import Modal from "../../components/Modal/Modal";
import { modalContext } from "../../context/modalContext";
import { useSelector } from "react-redux";


function SingleBlogScreen() {
  const { id } = useParams();
  const [getPost] = useGetPostMutation();

  const [isModalOpen, setOpenModal] = useContext(modalContext)
  const { userInfo } = useSelector((state) => state.auth);
 

  const [deletePost] = useDeletePostMutation()
  const navigate = useNavigate();

  const [post, setPost] = useState(null);
  

  const sanitizedHTML = DOMPurify.sanitize(post?.body);
  const POST = ReactHtmlParser(sanitizedHTML);
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
    setOpenModal(false)

    try {
      const deleted = await deletePost({ id }).unwrap()
      toast.success("Post is deleted")
      navigate('/')

    } catch (err) {
      toast.error(err)
    }

  }

  return (
    <div className="pageContainer space-top-5">
      {isModalOpen && 
        <Modal>
          <Typography sx={{ marginBottom: '5px' }}>Are you sure you want to delete this post</Typography>
          <Grid container spacing={2}>
            <Grid item>
              <Button variant="contained" onClick={handleApproveDeletion}>Confirm</Button>
            </Grid>
            <Grid item>
              <Button variant="contained" onClick={() => setOpenModal(false)} sx={{ backgroundColor: 'red' }}>Cancel</Button>
            </Grid>
          </Grid>
        </Modal>
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
              {post.authorId === userInfo._id && <Button onClick={() => setOpenModal(true)}>Delete</Button>}

              <AuthorBylineCard author={post.author} />
            </Box>
            <Box className="space-top-7">{POST}</Box>;
          </Box>
        </>
      )}
    </div>
  );
}

export default SingleBlogScreen;
