import React, { useState } from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import Styles from './RichText.module.css'
import classnames from "classnames";

function QuillRichText({ QuillValue, setQuillValue }) {
  const modules = {
    toolbar: [
      [{ header: [1, 2, 3, 4, 5,6,false] }],
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
  const formats =[
    'header', 'font', 'size', 'color', 'background',
    'bold', 'italic', 'underline', 'strike', 'blockquote',
    'list', 'bullet', 'indent', 'code-block',
    'align', 'link', 'image', 'video',
  ];


  return (
    <>
      <ReactQuill
        className={classnames(Styles['ql-toolbar'], Styles['ql-editor'])}
        theme="snow"
        modules={modules}
        formats={formats}
        value={QuillValue}
        onChange={(QuillValue) => setQuillValue(QuillValue)}
        placeholder="Start Writing.."
      ></ReactQuill>
    </>
  );
}

export default QuillRichText;
