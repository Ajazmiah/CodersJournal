import React, { useState } from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";

function QuillRichText({ QuillValue, setQuillValue }) {
  const modules = {
    toolbar: [
      [{ header: [1, 2, 3, 4, false] }],
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
        style={{height: '30vh'}}
        theme="snow"
        modules={modules}
        formats={formats}
        value={QuillValue}
        onChange={(QuillValue) => setQuillValue(QuillValue)}
      ></ReactQuill>
    </>
  );
}

export default QuillRichText;
