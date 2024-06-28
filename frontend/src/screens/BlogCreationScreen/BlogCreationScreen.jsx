import React, { useState, useEffect, useRef } from "react";
import Styles from "./BlogCreationScreen.module.css";
import classnames from "classnames";
import { useSubmitPostMutation } from "../../slices/postsApiSlice";
import { toast } from "react-toastify";
import "react-quill/dist/quill.snow.css";
import QuillRichText from "../../components/RichText/RichText";

function BlogCreationScreen({ editTitle, editSummary, quillValue, edit }) {
  const [submitPost] = useSubmitPostMutation();

  const postSubmitHandler = async (title, summary, QuillValue) => {
    try {
      let data = {
        title,
        summary,
        body: QuillValue,
      };
      console.log("_____DATA____", data)
      const res = await submitPost(data).unwrap();
    } catch (err) {
      toast.error(err);
    }
  };

  return (
    <QuillRichText
      postSubmitHandler={postSubmitHandler}
    />
  );
}

export default BlogCreationScreen;
