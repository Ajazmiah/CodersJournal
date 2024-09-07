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

  const postSubmitHandler = async (data) => {
    try {
      const res = await editPost(data).unwrap();
      if (res) {
        handlePostUpdated();
        toast.success("Post Updated");
      }
    } catch (err) {
      toast.error(err);
    }
  };

  const handleSubmit = (title, summary, QuillValue, s3Image) => {
    const form = new FormData();

    if (s3Image) {
      form.append("coverImage", s3Image); //muter file
    }
    form.append("title", title);
    form.append("summary", summary);
    form.append("QuillValue", QuillValue);
    form.append("id", id);

    postSubmitHandler(form);
  };

  return (
    <QuillRichText
      handleSubmit={handleSubmit}
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
