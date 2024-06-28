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
  ...rest
}) {


  const [editPost] = useEditPostMutation()


  const postSubmitHandler = async (title, summary, QuillValue) => {
    try {
      let data = {
        title,
        summary,
        body: QuillValue,
        id,
      };

      const res = await editPost(data).unwrap();
      if(res) {
        toast.success("Post Updated")
        
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
      id={id}
      edit
    />
  );
}

export default BlogEdit;
