import dotenv from "dotenv";
import { PutObjectCommand, S3Client } from "@aws-sdk/client-s3";

dotenv.config();

const bucketName = process.env.BUCKET_NAME;
const accessKey = process.env.ACCESS_KEY;
const bucketRegion = process.env.BUCKET_REGION;
const secretAccessKey = process.env.SECRET_ACCESS_KEY;

const s3 = new S3Client({
  credentials: {
    accessKeyId: accessKey,
    secretAccessKey: secretAccessKey,
  },
  region: bucketRegion,
});

export const uploadToS3 = async (file) => {
  try {
    const params = {
      Bucket: bucketName,
      Key: "postCoverImage-3/" + file?.originalname,
      Body: file.buffer,
      ContentType: file.mimetype,
    };

    const command = new PutObjectCommand(params);
    const response = await s3.send(command);

    // Generate and return the URL or key of the uploaded file
    const s3Url = `https://${bucketName}.s3.amazonaws.com/${params.Key}`;
    return s3Url; // Return the URL or key as per your requirement

  } catch (error) {
    console.error("Error uploading to S3:", error);
    throw new Error("Posting to S3 bucket failed at uploadToS3 function");
  }
};