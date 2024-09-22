import React from "react";
import { FaUpload } from "react-icons/fa";
import Styles from "./UploadFileButton.module.css";
function UploadFileButton({ type, name, handleChange, handleClear }) {
  return (
    <div className={Styles.upload}>
      <label htmlFor="file" className={Styles.label}>
        <FaUpload />
        <span>Upload Picture </span>
      </label>
      <input type="file" id="file" hidden onChange={handleChange} />
    </div>
  );
}

export default UploadFileButton;
