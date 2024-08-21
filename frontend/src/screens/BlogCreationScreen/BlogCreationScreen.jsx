import React, { useState, useEffect, useRef } from "react";
import Styles from "./BlogCreationScreen.module.css";
import classnames from "classnames";
import { useSubmitPostMutation } from "../../slices/postsApiSlice";
import { toast } from "react-toastify";
import "react-quill/dist/quill.snow.css";
import QuillRichText from "../../components/RichText/RichText";

function BlogCreationScreen() {
  const [submitPost] = useSubmitPostMutation();

  const postSubmitHandler = async (formData) => {
    try {
      const res = await submitPost(formData).unwrap();
    } catch (err) {
      toast.error(err);
    }
  };

  const handleSubmit = (title, summary, QuillValue, image, s3Image) => {

    const form = new FormData();

    form.append("coverImage", s3Image); //muter file
    form.append("title", title);
    form.append("summary", summary);
    form.append("QuillValue", QuillValue);
    form.append("image", image);

    postSubmitHandler(form);
  };

  return (
    <QuillRichText
      postSubmitHandler={postSubmitHandler}
      handleSubmit={handleSubmit}
    />
  );
}

export default BlogCreationScreen;
