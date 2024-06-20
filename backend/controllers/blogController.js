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
  console.log(post)
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

const editPost = asyncHandler(async (req, res, next) => {
  const _id = req.body.id
  console.log("HIIIII")

  const post = await blogModel.findById("665936904d9a366b13e68ec1");

  if(post)
  res.status(200).json(post)

  res.status(404).send("Page Doesnt exist")


})

export { createPost, getBlogs, getPost, allPost, deletePost, editPost };
