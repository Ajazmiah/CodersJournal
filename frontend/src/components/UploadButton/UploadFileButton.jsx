import React from "react";
import { FaUpload } from "react-icons/fa";
import Styles from "./UploadFileButton.module.css";
function UploadFileButton({ type, name, handleChange, handleClear }) {
  return (
    <div className={Styles.upload}>
      <label htmlFor="file" className={Styles.label} >
        <FaUpload />
        <span>Upload File </span>

       
      </label>

      <span onClick={handleClear} style={{ cursor: "pointer" }}>
        X
      </span>

      <input type="file" id="file" hidden onChange={handleChange} />
    </div>
  );
}

export default UploadFileButton;
