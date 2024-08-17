import React, { useState, useEffect } from "react";
import ReactHtmlParser from "html-react-parser";
import { useParams, useNavigate } from "react-router-dom";
import {
  useGetPostMutation,
  useDeletePostMutation,
} from "../../slices/postsApiSlice";
import { toast } from "react-toastify";
import { formatDate, sanitizeContent } from "../../utils";
import AuthorBylineCard from "../../components/AuthorBylineCard/AuthorBylineCard";
import ModalRectangular from "../../components/Modal/ModalRectangular";
import { useSelector } from "react-redux";
import PageHeader from "../../components/PageHeader/PageHeader";
import { useBackdrop } from "../../components/Backdrop/Backdrop";
import BlogEdit from "../../components/BlogEdit/BlogEdit";
import Border from "../../components/Atoms/Border/Border";

function SingleBlogScreen() {
  const { id } = useParams();
  const [getPost] = useGetPostMutation();
  const { userInfo } = useSelector((state) => state.auth);
  const [modalContentType, setModalContentType] = useState("");
  const [deletePost] = useDeletePostMutation();
  const navigate = useNavigate();
  const [post, setPost] = useState(null);
  const { backdrop, setBackdrop } = useBackdrop();
  const [postUpdated, setPostUpdated] = useState(false);

  const sanitizedHTML = sanitizeContent(post?._doc?.body);
  const POST = ReactHtmlParser(sanitizedHTML);

  useEffect(() => {
    const fetchPost = async () => {
      console.log("ID", id)
      try {
        const fetchedPost = await getPost({ id }).unwrap();
        setPost(fetchedPost);
      } catch (err) {
        if (err.status === 404) {
          navigate("/404");
        } else {
          toast.error(err?.data?.message);
        }
      }
    };

    fetchPost();
  }, [getPost, id, postUpdated]);


  const handleApproveDeletion = async () => {
    console.log("HI Approved:", id)
    try {
      await deletePost({ id }).unwrap();
      toast.success("Post is deleted");
      navigate("/");
    } catch (err) {
      toast.error(err);
    }
  };

  const handleModal = (handleType) => {
    console.log("CLICKE CLICKED CLIKED")
    setBackdrop((prev) => !prev);
    setModalContentType(handleType);
  };

  const handlePostUpdated = () => setPostUpdated((prev) => !prev);

  const modalContent = modalContentType === "delete" && (
    <>
      <p>Are you sure you want to delete this post?</p>
      <button onClick={handleApproveDeletion}>Confirm</button>
    </>
  );

  const EDIT_BLOG = post && modalContentType !== "delete" && (
    <BlogEdit
      editTitle={post._doc.title}
      handlePostUpdated={handlePostUpdated}
      editSummary={post._doc.summary}
      quillValue={post?._doc?.body}
      coverImage={post?._doc?.coverImage}
      id={post._doc._id}
      handleBackdrop={() => setBackdrop((prev) => !prev)}
      backdrop={backdrop}
    />
  );

  return (
    <div className="space-top-5">
      {/* {error && <div>PAGE IS NOT FOUND</div>} */}
      {backdrop ? (
        <ModalRectangular
          handleBackdrop={() => setBackdrop((prev) => !prev)}
          backdrop={backdrop}
        >
          {modalContent}
          {EDIT_BLOG}
        </ModalRectangular>
      ) : null}

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
              <AuthorBylineCard author={post.author}/>
              <Border/>
              <img src={post?._doc.coverImage} />
            </div>
            <div className="merriweather-light ">{POST}</div>
          </div>
        </>
      )}
    </div>
  );
}

export default SingleBlogScreen;
