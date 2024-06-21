import React, { useState, useEffect, useRef } from "react";
import Styles from "./BlogCreationScreen.module.css";
import classnames from "classnames";
import { useSubmitPostMutation } from "../../slices/postsApiSlice";
import { toast } from "react-toastify";
import "react-quill/dist/quill.snow.css";
import QuillRichText from "../../components/RichText/RichText";

function BlogCreationScreen(
  editTitle = "",
  editSummary = "",
  quillValue = "",
  edit
) {
  const [title, setTitle] = useState((editTitle = ""));
  const [summary, setSummary] = useState((editSummary = ""));
  const [QuillValue, setQuillValue] = React.useState(quillValue);

  const [submitPost] = useSubmitPostMutation();

  const titleRef = useRef();

  useEffect(() => titleRef.current.focus(), []);

  const postSubmitHandler = async () => {
    try {
      let data = {
        title,
        summary,
        body: QuillValue,
      };
      const res = await submitPost(data).unwrap();
    } catch (err) {
      toast.error(err);
    }

    setTitle("");
    setSummary("");
    setQuillValue("");
  };

  return (
    <div className={classnames("container pageContainer", Styles.richText)}>
      <div>
        <input
          required
          placeholder="Title.."
          ref={titleRef}
          id="title"
          className={Styles.input}
          name="title"
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
      </div>

      <div>
        <input
          required
          className={Styles.input}
          id="summary"
          placeholder="Summary.."
          name="summary"
          type="text"
          value={summary}
          onChange={(e) => setSummary(e.target.value)}
          autocomplete="shipping address-line1"
        />
      </div>
      <QuillRichText setQuillValue={setQuillValue} QuillValue={QuillValue} />
      <button
        variant="contained"
        sx={{ marginTop: "50px" }}
        onClick={postSubmitHandler}
      >
        Post
      </button>
      {edit && <button onClick={postSubmitHandler}>Cancel</button>}
    </div>
  );
}

export default BlogCreationScreen;
