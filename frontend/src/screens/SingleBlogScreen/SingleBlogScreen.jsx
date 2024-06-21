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
import PageHeader from "../../components/PageHeader/PageHeader";
import BlogCreationScreen from "../BlogCreationScreen/BlogCreationScreen";
import { useBackdrop } from "../../components/Backdrop/Backdrop";

function SingleBlogScreen() {
  const { id } = useParams();
  const [getPost] = useGetPostMutation();

  const [isBackdropOpen, setOpenBackdrop] = useContext(backdropContext);
  const { userInfo } = useSelector((state) => state.auth);

  const [openModal, setOpenModal] = useState(false);

  const [modalContentType, setModalContentType] = useState("");

  const [deletePost] = useDeletePostMutation();
  const navigate = useNavigate();

  const [post, setPost] = useState(null);

  const sanitizedHTML = DOMPurify.sanitize(post?._doc?.body);

  const POST = ReactHtmlParser(sanitizedHTML);

  const { backdrop, setBackdrop } = useBackdrop();

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
      navigate("/");
    } catch (err) {
      toast.error(err);
    }
  };

  const handleEditPost = () => {
    navigate("/create");
  };

  const handleModal = (handleType) => {
    setBackdrop((prev) => !prev);
    setModalContentType(handleType);
  };

  const modalContent =
    modalContentType === "delete" ? (
      <>
        <p>Are you sure you want to delete this post?</p>
        <button onClick={handleApproveDeletion}>Confirm</button>
      </>
    ) : (
      <>
        <BlogCreationScreen edit />
      </>
    );

  return (
    <div className="space-top-5">
      {backdrop && (
        <ModalRectangular handleBackdrop={() => setBackdrop((prev) => !prev)}>
          {modalContent}
        </ModalRectangular>
      )}

      {post && (
        <>
          <div>
            <PageHeader title={post._doc.title} />
            <div>
              <p>{post._doc.summary}</p>
              <p>{formatDate(post?.createdAt)}</p>
              {post?._doc.authorId === userInfo?._id && (
                <div>
                  <button onClick={() => handleModal("delete")}>Delete</button>
                  <button onClick={() => handleModal("edit")}>Edit Post</button>
                </div>
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
