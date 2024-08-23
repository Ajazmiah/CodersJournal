import React from "react";
import { FaUpload } from "react-icons/fa";
import Styles from './UploadFileButton.module.css'
function UploadFileButton({ type, name, handleChange }) {
  return (
    <>
      <label htmlFor="file" className={Styles.label}>
        Upload Cover Image <FaUpload />
      </label>

      <input type={type} id="file" hidden onChange={handleChange} />
    </>
  );
}

export default UploadFileButton;