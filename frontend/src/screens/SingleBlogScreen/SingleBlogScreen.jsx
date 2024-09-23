import React, { useState, useEffect } from "react";
import ReactHtmlParser from "html-react-parser";
import { useParams, useNavigate } from "react-router-dom";
import Styles from "./SingleBlogScreen.module.css";
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
import Button from "../../components/Atoms/Button/Button";
import Sidebar from "../../components/SideBar/SideBar";
import classNames from "classnames";
import Image from "../../components/Image/Image";
import { getIcon } from "../../components/Icon";

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
    try {
      await deletePost({ id }).unwrap();
      toast.success("Post is deleted");
      navigate("/");
    } catch (err) {
      toast.error(err);
    }
  };

  const handleModal = (handleType) => {
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
      coverImage={post?._doc?.coverImageName}
      id={post._doc._id}
      handleBackdrop={() => setBackdrop((prev) => !prev)}
      backdrop={backdrop}
    />
  );

  return (
    <div className={classNames(" main-2-column space-top-9 Container")}>
      <div className={Styles.SingleBlogScreen}>
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
              <div className={"space-bottom-3 "}>
                <PageHeader
                  title={post._doc.title}
                  summary={post._doc.summary}
                />
              </div>

              <div>
                {post?._doc.authorId === userInfo?._id && (
                  <div className={Styles.btns}>
                    <span onClick={() => handleModal("delete")}>
                      {getIcon("delete")}
                    </span>

                    <span onClick={() => handleModal("edit")}>
                      {getIcon("update")}
                    </span>
                  </div>
                )}
                <Image
                  src={post?._doc.coverImageName || post?._doc.coverImage}
                  loading="eager"
                  width="780px"
                />
                <div className={Styles.blogDetails}>
                  <AuthorBylineCard author={post.author} />
                  <p className={Styles.date}>{formatDate(post?.createdAt)}</p>
                </div>
                <Border />
              </div>
              <div className={classNames('space-top-1 merriweather-light', Styles.post)}>{POST}</div>
            </div>
          </>
        )}
      </div>

      <Sidebar />
    </div>
  );
}

export default SingleBlogScreen;
