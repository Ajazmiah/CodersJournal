import asyncHandler from "express-async-handler";
import blogModel from "../models/blogModels.js";
import User from "../models/userModel.js";
import { verifytoken } from "../utils/verifyToken.js";
import { validationResult } from "express-validator";

const allPost = asyncHandler(async (req, res, next) => {
  const blogPosts = await blogModel.find();
  res.status(200).json(blogPosts);
});

const createPost = asyncHandler(async (req, res, next) => {
  // Check validation results
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
   // res.status(400).json({ errors: errors.array()});
    throw new Error(errors.errors)
    
  }

  const { title, body, summary } = req.body;

  const decoded = verifytoken(req);
  const user = await User.findById(decoded.userId).select("-password");

  const blog = await blogModel.create({
    title,
    body,
    summary,
    authorId: user._id,
  });

  if (blog) {
    res.status(200).json(blog);
  } else {
    res.status(400);
    throw new Error("Failed to create the Blog");
  }
});

// ONLY THE USERS POST - USER THAT'S LOGGED IN 
/* 
======TO DO=====
- User Profile for user themseleves and public user view 
- both should see post that this user created but 
- only user themselevs are allow to update it
*/
const getBlogs = asyncHandler(async (req, res, next) => {
  const decoded = verifytoken(req);
  const user = await User.findById(decoded.userId).select("-password");



  const blogs = await blogModel.find({ authorId: user._id}).populate({
    path: "authorId",
    select: ["-password"],
  });

  res.status(200).json(blogs);
});

// SINGLE POST PAGE
const getPost = asyncHandler(async (req, res, next) => {
  const post = await blogModel.findById(req.body.id);
  const user = await User.findById(post.authorId).select("-password");
  
  const POST = {
    ...post,
    author: user
  }
  res.status(200).json(POST);
});

const deletePost = asyncHandler(async (req, res, next) => {
  const _id = req.body.id;
  const post = await blogModel.findByIdAndDelete(_id);
  res.status(200).json(post);
});

export { createPost, getBlogs, getPost, allPost, deletePost };
