import dotenv from "dotenv";
import {
  PutObjectCommand,
  S3Client,
  GetObjectCommand,
} from "@aws-sdk/client-s3";
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";

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

export const uploadToS3 = async (file, customFileName = null) => {
  try {
    const params = {
      Bucket: bucketName,
      Key: "postCoverImage/" + customFileName,
      Body: file.buffer,
      ContentType: file.mimetype,
    };

    const command = new PutObjectCommand(params);
    await s3.send(command);
  } catch (error) {
    console.error("Error uploading to S3:", error);
    throw new Error("Posting to S3 bucket failed at uploadToS3 function");
  }
};

export const getFileFromS3 = async (fileName) => {
  const command = new GetObjectCommand({
    Bucket: bucketName,
    Key: "postCoverImage/" + fileName,
  });

  const presigned = getSignedUrl(s3, command, { expiresIn: 3600 });

  return presigned;
};
