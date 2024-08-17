import React, { useState, useRef, useEffect } from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import Styles from "./RichText.module.css";
import classnames from "classnames";
import { useBackdrop } from "../Backdrop/Backdrop";
import { sanitizeContent } from "../../utils";
import useUploadImage from "../../hooks/useUploadImage";
import { toast } from "react-toastify";

const VALID_FILE_TYPES = ["image/jpg", "image/jpeg", "image/png", "image/webp"];

function QuillRichText({
  editQuillValue,
  editTitle,
  editSummary,
  editCoverImage,
  postSubmitHandler,
  handleBackdrop = () => {},
  ...rest
}) {
  const [handleImageUpload, image] = useUploadImage();

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

  const [title, setTitle] = useState(editTitle || "");
  const [summary, setSummary] = useState(editSummary || "");
  const [QuillValue, setQuillValue] = React.useState(editQuillValue || null);
  const coverImage = image?.myFile || editCoverImage;
  const [error, setError] = useState([]);


  const [s3Image , setS3Image] = useState(null)

  const validateInputs = (titleInput, summaryInput, quillInput, image) => {
    let errors = [];

    // Check if any of the inputs are empty
    if (
      [titleInput, summaryInput, quillInput].some(
        (input) => input.trim() === ""
      )
    ) {
      errors.push("You need to fill up all the fields");
    }

    // Check if the image is missing
    if (!coverImage) {
      errors.push("You need to upload a cover image");
    }

    // Set error if there are any errors
    if (errors.length > 0) {
      setError(errors);
      return false;
    }

    return true;
  };
  //////////////

  const handleFileChange2 = async (e) => {
    const file = e.target.files[0];

    if (!VALID_FILE_TYPES.includes(file.type)) {
      toast.error("Please choose an image file");
      return;
    }
    try {
      const form = new FormData();
      form.append("coverImage", file);

      // const res = await postImage(form).unwrap();
      // console.log("RESS", res)
      setS3Image(form)

    } catch (err) {}
  };

  //////////

  useEffect(() => {
    if (error.length > 0) {
      let errorDiv = error.map((er) => <div> *{er}</div>);
      toast.error(<div>{errorDiv}</div>);
    }
  }, [error]);

  useEffect(() => titleRef.current.focus(), []);

  const handleClick = () => {
    if (validateInputs(title, summary, QuillValue, image)) {
      handleBackdrop();

      postSubmitHandler(title, summary, QuillValue, coverImage, s3Image);
    } else return;
  };
  const handleFileChange = async (event) => {
    event.preventDefault();
    const file = event.target.files[0];

    await handleImageUpload(file);
  };

  return (
    <>
      <div className={classnames("container pageContainer", Styles.richText)}>
        <>
          <label htmlFor="image">Upload</label>

          <input type="file" id="image" hidden onChange={handleFileChange2} />
        </>
        {<img src={coverImage} />}
        <div>
          <input
            required={true}
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
            required={true}
            className={Styles.input}
            id="summary"
            placeholder="Summary.."
            name="summary"
            type="text"
            value={summary}
            onChange={(e) => setSummary(e.target.value)}
            autoComplete="shipping address-line1"
          />
        </div>
        <div>
          <input
            type="file"
            required={true}
            accept="image/*"
            onChange={handleFileChange}
            placeholder="Cover Image"
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
