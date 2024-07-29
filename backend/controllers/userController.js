import userModel from "../models/userModel.js";
import generateToken from "../utils/generateToken.js";
import asyncHandler from "express-async-handler"; // This eliminates the need to use try and catch in Controller function
import { validationResult } from "express-validator";

const signup = asyncHandler(async (req, res, next) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    res.status(422);
    throw new Error(errors.errors[0].msg);
  }

  const {
    firstName,
    lastName,
    profilePicture,
    email,
    password,
    confirmPassword,
    descption,
    links,
  } = req.body;

  const userExist = await userModel.findOne({ email });

  if (userExist) {
    res.status(400);
    throw new Error("This user already Exists: Please use a different E-mail");
  }

  const user = await userModel.create({
    firstName,
    lastName,
    email,
    password,
    confirmPassword,
    profilePicture,
  });
  // Create a new user instance
  // - Another way of creating it
  // const newUser = new User({
  //   username: "john_doe",
  //   email: "john@example.com",
  // });

  if (user) {
    generateToken(res, user._id);
    res.status(201).json({
      _id: user._id,
      firstName: user.firstName,
      lastName: user.lastName,
      email: user.email,
      profilePicture: user.profilePicture,
    });
  } else {
    res.status(400);
    throw new Error("Invalid user data");
  }
});

const singin = asyncHandler(async (req, res, next) => {
  const { email, password } = req.body;

  const user = await userModel.findOne({ email });

  if (user && (await user.matchPassword(password))) {
    generateToken(res, user._id);
    res.status(201).json({
      _id: user._id,
      firstName: user.firstName,
      lastName: user.lastName,
      email: user.email,
      profilePicture: user?.profilePicture,
    });
  } else {
    res.status(401);
    throw new Error("Invalid email or password");
  }
});

const logout = asyncHandler(async (req, res, next) => {
  res.cookie("jwt", "", {
    httpOnly: true,
    expires: new Date(0),
  });

  /*ANOTHER WAY TO DO THIS
    return res
    .clearCookie("access_token")
    .status(200)
    .json({ message: "Successfully logged out 😏 🍀" });
*/

  res.status(200).json({ message: " Logged out" });
});

const getUserProfile = asyncHandler(async (req, res, next) => {
  const user = {
    _id: req.user._id,
    name: req.user.firstName + " " + req.user.lastName,
    email: req.user.email,
    profilePicture: req.user.profilePicture,
  };

  res.status(200).json(user);
});

const updateUser = asyncHandler(async (req, res, next) => {
  const userId = req.user._id;
  const user = await userModel.findById(userId);

  if (user) {
    user.firstName = req.body.firstName || user.firstName;
    user.lastName = req.body.lastName || user.lastName;
    user.email = req.body.email || user.email;
    user.profilePicture = req.body.profilePicture || user.profilePicture;

    if (req.body.password) {
      user.password = req.body.password;
    }

    const updatedUser = await user.save();
    res.status(200).json({
      _id: updatedUser._id,
      firstName: updatedUser.firstName,
      lastName: updatedUser.lastName,
      profilePicture: updatedUser.profilePicture,
    });
  } else {
    res.status(404);
    throw new Error("USER NOT FOUND!");
  }
});

const userPublicProfile = asyncHandler(async (req,res,next) => {
  const post = {
    "userId": 12345,
    "username": "john_doe",
    "posts": [
      {
        "postId": 1,
        "title": "My First Post",
        "content": "This is the content of my first post.",
        "createdAt": "2024-07-28T12:34:56Z"
      },
      {
        "postId": 2,
        "title": "Another Post",
        "content": "This is some more content in another post.",
        "createdAt": "2024-07-29T14:22:10Z"
      }
    ],
    "profile": {
      "bio": "Software developer and tech enthusiast.",
      "website": "https://example.com",
      "avatarUrl": "https://example.com/avatar.jpg"
    }
  }
  
  res.status(200).json(post)
});

export { signup, singin, logout, getUserProfile, updateUser,userPublicProfile };
