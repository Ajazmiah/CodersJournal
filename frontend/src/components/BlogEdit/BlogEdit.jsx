import React, { useState } from "react";
import { useEditPostMutation } from "../../slices/postsApiSlice";
import QuillRichText from "../RichText/RichText";
import { toast } from "react-toastify";

function BlogEdit({
  editTitle,
  editSummary,
  quillValue,
  id,
  handleBackdrop,
  handlePostUpdated,
  coverImage,
  ...rest
}) {
  const [editPost] = useEditPostMutation();

  const postSubmitHandler = async (title, summary, QuillValue, coverImage) => {
    console.log("BLOG EDIT COVER PAGE", coverImage)
    try {
      let data = {
        title,
        summary,
        body: QuillValue,
        coverImage,
        id,
      };

      const res = await editPost(data).unwrap();
      if (res) {
        handlePostUpdated();
        toast.success("Post Updated");
      }
    } catch (err) {
      toast.error(err);
    }
  };

  return (
    <QuillRichText
      postSubmitHandler={postSubmitHandler}
      editTitle={editTitle}
      editSummary={editSummary}
      editQuillValue={quillValue}
      handleBackdrop={handleBackdrop}
      editCoverImage={coverImage}
      id={id}
      edit
    />
  );
}

export default BlogEdit;
