import { useState, useRef } from "react";

function useUploadImage() {
  const [image, setImage] = useState({ myFile: null });
  const fileInputRef = useRef(null);

  const clearFileName = () => {
    setImage({ myFile: null });
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  const handleImage = async (event) => {
    event.preventDefault();
    const file = event.target.files[0];
    if (file && file.type.startsWith("image/")) {
      await handleImageUpload(file);
    }
  };

  const INPUT = (
    <>
      <input
        type="file"
        ref={fileInputRef}
        accept="image/*"
        onChange={handleImage}
      />
      <span onClick={clearFileName} style={{ cursor: "pointer" }}>
        X
      </span>
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

  const handleImageUpload = async (file) => {
    const base64Img = await convertToBase64(file);
    setImage({ myFile: base64Img });
    return base64Img;
  };

  return [handleImageUpload, image, handleImage, INPUT];
}

export default useUploadImage;
