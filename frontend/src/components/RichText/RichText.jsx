import React, { useState, useRef, useEffect } from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import Styles from "./RichText.module.css";
import classnames from "classnames";

function QuillRichText({
  editQuillValue,
  editTitle,
  editSummary,
  postSubmitHandler,
  setBackdrop,
  ...rest
}) {
  const modules = {
    toolbar: [
      [{ header: [1, 2, 3, 4, 5, 6, false] }],
      ["bold", "italic", "underline", "strike", "blockquote", "code-block"],
      [
        { list: "ordered" },
        { list: "bullet" },
        { indent: "-1" },
        { indent: "+1" },
      ],
      ["link", "image"],
      ["clean"],
    ],
  };
  const formats = [
    "header",
    "font",
    "size",
    "color",
    "background",
    "bold",
    "italic",
    "underline",
    "strike",
    "blockquote",
    "list",
    "bullet",
    "indent",
    "code-block",
    "align",
    "link",
    "image",
    "video",
  ];

  const titleRef = useRef();

  const { id = null, edit = null } = rest;

  const [title, setTitle] = useState(editTitle || "");
  const [summary, setSummary] = useState(editSummary || "");
  const [QuillValue, setQuillValue] = React.useState(editQuillValue || null);

  useEffect(() => titleRef.current.focus(), []);

  const handleClick = () => {
    postSubmitHandler(title, summary, QuillValue);
    setBackdrop((prev) => !prev);
  };

  return (
    <>
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
        <ReactQuill
          className={classnames(Styles["ql-toolbar"], Styles["ql-editor"])}
          theme="snow"
          modules={modules}
          formats={formats}
          value={QuillValue}
          onChange={(QuillValue) => setQuillValue(QuillValue)}
          placeholder="Start Writing.."
        ></ReactQuill>

        <button
          variant="contained"
          sx={{ marginTop: "50px" }}
          onClick={handleClick}
        >
          Post
        </button>
      </div>
    </>
  );
}

export default QuillRichText;
