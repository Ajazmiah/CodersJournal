import asyncHandler from "express-async-handler";
import blogModel from "../models/blogModels.js";
import User from "../models/userModel.js";
import { verifytoken } from "../utils/verifyToken.js";
import { validationResult } from "express-validator";
import { getFileFromS3, uploadToS3 } from "../utils/s3.js";
import { getRandomHex } from "../utils/randomHex.js";
import { attachPresignedURLs } from "../utils/attachedSignedURL.js";

// Public - All Posts that shows up on HomeScreen
const allPost = asyncHandler(async (req, res, next) => {
  try {
    const blogPosts = await blogModel.find().populate({
      path: "authorId",
      select: "-password",
    });

    const SignedPosts = await attachPresignedURLs(blogPosts);

    res.status(200).json(SignedPosts);
  } catch (error) {
    next(error);
  }
});

const createPost = asyncHandler(async (req, res, next) => {
  // Check validation results
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const richText = req.body;

  const title = richText.title;
  const body = richText.QuillValue;
  const summary = richText.summary;
  const coverImage = richText.image;

  const decoded = verifytoken(req);
  const user = await User.findById(decoded.userId).select("-password");

  const customFileName = getRandomHex();

  await uploadToS3(req.file, customFileName);

  const blog = await blogModel.create({
    title,
    body,
    summary,
    coverImage,
    authorId: user._id,
    coverImageName: customFileName,
  });
  if (blog) {
    res.status(200).json(blog);
  } else {
    res.status(401);
    throw new Error("Failed to create the Blog");
  }
});

//profile POSTS -
const getAllUserPosts = asyncHandler(async (req, res, next) => {
  const decoded = verifytoken(req);
  const blogs = await blogModel.find({ authorId: decoded.userId }).populate({
    path: "authorId",
    select: "-password -confirmPassword",
  });

  const SignedPosts = await attachPresignedURLs(blogs);

  res.status(200).json(SignedPosts);
});

//
const getUserPosts = asyncHandler(async (req, res, next) => {
  const decoded = verifytoken(req);

  const blogPosts = await blogModel
    .find({ authorId: { $ne: decoded.userId } })
    .find()
    .populate({
      path: "authorId",
      select: ["-password"],
    });

  if (blogPosts) {
    const SignedPosts = await attachPresignedURLs(blogPosts);
    res.status(200).json(SignedPosts);
  } else {
    res.status(400);
    throw new Error("The post could not be fetched at this time");
  }
});

// SINGLE POST PAGE
const getPost = asyncHandler(async (req, res, next) => {
  const post = await blogModel.findById(req.params.id);

  if (!post) {
    res.status(404);
    throw new Error("No post was found!");
  }
  const user = await User.findById(post.authorId).select(
    "-password -confirmPassword"
  );

  const SignedPosts = await attachPresignedURLs(post);

  const POST = {
    ...SignedPosts,
    author: user,
  };
  res.status(200).json(POST);
});

const deletePost = asyncHandler(async (req, res, next) => {
  console.log("HIIIIII FROM DELETE");
  const _id = req.body.id;
  const post = await blogModel.findByIdAndDelete(_id);
  res.status(200).json(post);
});

const editPost = asyncHandler(async (req, res, next) => {
  const { id, title, summary, body, coverImage } = req.body;

  const post = await blogModel.findById(id);

  if (post) {
    post.title = title;
    post.summary = summary;
    post.body = body;
    post.coverImage = coverImage || post?.coverImage;

    const updatedPost = await post.save();

    res.status(200).json(updatedPost);
  } else {
    res.status(500);
    throw new Error("Something went wrong - Unable to edit post");
  }
});

export {
  createPost,
  getAllUserPosts,
  getPost,
  allPost,
  deletePost,
  editPost,
  getUserPosts,
};
