import { useState } from "react";

function useUploadImage() {
  const [image, setImage] = useState({ myFile: null });

  function convertToBase64(file) {
    return new Promise((resolve, reject) => {
      const fileReader = new FileReader();
      fileReader.readAsDataURL(file);
      fileReader.onload = () => {
        resolve(fileReader.result);
      };
      fileReader.onerror = (error) => {
        reject(error);
      };
    });
  }

  const handleImageUpload = async (file) => {
    const base64Img = await convertToBase64(file);
    setImage((prev) => ({ myFile: base64Img }));
    return base64Img;
  };

  return [handleImageUpload, image];
}

export default useUploadImage;
