import React, { useState, useContext, useEffect } from "react";
import ReactHtmlParser from "html-react-parser";
import DOMPurify from "dompurify";
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
import PageHeader from "../../components/PageHeader/PageHeader";

function SingleBlogScreen() {
  const { id } = useParams();
  const [getPost] = useGetPostMutation();

  const [isBackdropOpen, setOpenBackdrop] = useContext(backdropContext);
  const { userInfo } = useSelector((state) => state.auth);

  const [openModal, setOpenModal] = useState(false);

  const [deletePost] = useDeletePostMutation();
  const navigate = useNavigate();

  const [post, setPost] = useState(null);

  const sanitizedHTML = DOMPurify.sanitize(post?._doc?.body);

  const POST = ReactHtmlParser(sanitizedHTML);


  useEffect(() => {
    const fetchPost = async () => {
      try {
        const post = await getPost({ id }).unwrap();
        setPost(post);
        console.log("SINGLE POST", post);
      } catch (err) {
        toast.error("Something went wrong, please try again!");
      }
    };

    fetchPost();
  }, [getPost, id]);

  const handleApproveDeletion = async () => {
    setOpenModal(false);

    try {
      await deletePost({ id }).unwrap();
      toast.success("Post is deleted");
      navigate('/');
    } catch (err) {
      toast.error(err);
    }
  };

  const handleCancel = (e) => {
    console.log(e.target.className);
    setOpenModal(false);
  };

  return (
    <div className="space-top-5">
      {openModal && (
        <Backdrop>
          <ModalRectangular>
            <p>Are you sure you want to delete this post?</p>
            <div>
              <button onClick={handleApproveDeletion}>Confirm</button>
              <button onClick={handleCancel}>Cancel</button>
            </div>
          </ModalRectangular>
        </Backdrop>
      )}

      {post && (
        <>
          <div>
            <PageHeader title={post._doc.title}/>
            <div>
              <p>{post._doc.summary}</p>
              <p>{formatDate(post?.createdAt)}</p>
              {post?._doc.authorId === userInfo?._id && (
                <button onClick={() => setOpenModal(true)}>Delete</button>
              )}
              <AuthorBylineCard author={post.author} />
            </div>
            <div className="merriweather-light ">{POST}</div>
          </div>
        </>
      )}
    </div>
  );
}

export default SingleBlogScreen;
