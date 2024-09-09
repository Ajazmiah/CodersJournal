import dotenv from "dotenv";
import {
  PutObjectCommand,
  S3Client,
  GetObjectCommand,
  DeleteObjectCommand,
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

export const uploadToS3 = async (
  file,
  customFileName = null,
  folderName = "postCoverImage"
) => {
  try {
    const params = {
      Bucket: bucketName,
      Key: `${folderName}/` + customFileName,
      Body: file.buffer,
      ContentType: file.mimetype,
    };

    const command = new PutObjectCommand(params);
    await s3.send(command);
  } catch (error) {
    console.error("Error uploading to S3:", error);
    throw new Error("Something went wrong - server error");
  }
};

export const getFileFromS3 = async (
  fileName,
  folderName = "postCoverImage"
) => {
  const command = new GetObjectCommand({
    Bucket: bucketName,
    Key: `${folderName}/` + fileName,
  });

  const expiresIn = 7 * 24 * 60 * 60; // 7 days

  const presigned = getSignedUrl(s3, command, { expiresIn });

  return presigned;
};

export const deleteFromS3 = async (fileName, folderName) => {
  const command = new DeleteObjectCommand({
    Bucket: bucketName,
    Key: `${folderName}/` + fileName,
  });

  await s3.send(command);
};
