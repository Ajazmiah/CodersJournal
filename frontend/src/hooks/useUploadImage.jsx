import { useState, useRef } from "react";
import UploadFileButton from "../components/UploadButton/UploadFileButton";
import { toast } from "react-toastify";

function useUploadImage() {
  const VALID_FILE_TYPES = [
    "image/jpg",
    "image/jpeg",
    "image/png",
    "image/webp",
  ];

  const [image, setImageFile] = useState(null);
  const [previewImage, setPreviewCoverImage] = useState(null);

  const clearFileName = () => {
    console.log("CLICKED")
    setImageFile(null)
    setPreviewCoverImage(null);
  };

  const handleImage = async (e) => {
    event.preventDefault();

    const file = e.target.files[0];

    console.log("FILE_______()", file)

    if (!VALID_FILE_TYPES.includes(file.type)) {
      toast.error("Please choose an image file");
      return;
    }

    setPreviewCoverImage(URL.createObjectURL(file));
    setImageFile(file);
  };

  const INPUT = (
    <>
      <UploadFileButton handleChange={handleImage} handleClear={clearFileName}  />
    </>
  );

  function convertToBase64(file) {
    return new Promise((resolve, reject) => {
      const fileReader = new FileReader();
      fileReader.readAsDataURL(file);
      fileReader.onload = () => resolve(fileReader.result);
      fileReader.onerror = (error) => reject(error);
    });
  }

  return [previewImage, image, INPUT];
}

export default useUploadImage;
