import sharp from "sharp";

export const optimizeImage = async (img, userImage) => {
  const imageFor = {
    coverImage: {
      width: 780,
      height: 400,
    },
    profilePicture: {
      width: 400,
      height: 400,
    },
  };

  const width = imageFor[userImage].width;
  const height = imageFor[userImage].height;

  const resizedImage = await sharp(img).resize(width, height).toBuffer();

  return resizedImage;
};
