import React, { useState, useEffect, useRef } from "react";
import Styles from "./BlogCreationScreen.module.css";
import classnames from "classnames";
import { useSubmitPostMutation } from "../../slices/postsApiSlice";
import { toast } from "react-toastify";
import "react-quill/dist/quill.snow.css";
import QuillRichText from "../../components/RichText/RichText";
import { useNavigate } from "react-router-dom";

function BlogCreationScreen() {
  const [submitPost] = useSubmitPostMutation();

  const navigate = useNavigate();

  const postSubmitHandler = async (formData) => {
    try {
      const res = await submitPost(formData).unwrap();

      if (res) {
        toast.success("Your post was successful");
        navigate("/profile");
      }
    } catch (err) {
      toast.error(err);
    }
  };

  const handleSubmit = (title, summary, QuillValue, s3Image) => {
    const form = new FormData();

    form.append("coverImage", s3Image); //muter file
    form.append("title", title);
    form.append("summary", summary);
    form.append("QuillValue", QuillValue);

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
