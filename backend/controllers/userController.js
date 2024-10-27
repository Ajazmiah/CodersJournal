import userModel from "../models/userModel.js";
import generateToken from "../utils/generateToken.js";
import asyncHandler from "express-async-handler"; // This eliminates the need to use try and catch in Controller function
import { validationResult } from "express-validator";
import blogModel from "../models/blogModels.js";
import User from "../models/userModel.js";
import { getRandomHex } from "../utils/randomHex.js";
import { getFileFromS3, uploadToS3 } from "../utils/s3.js";
import { attachPresignedURLs } from "../utils/attachedSignedURL.js";
import { optimizeImage } from "../utils/imageOptimize.js";
import { sendMail, transporter } from "../utils/nodemailer.js";

const signup = asyncHandler(async (req, res, next) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    res.status(422);
    throw new Error(errors.errors[0].msg);
  }

  const registerForm = req.body;

  const firstName = registerForm.firstName;
  const lastName = registerForm.lastName;
  const email = registerForm.email;
  const password = registerForm.password;

  const userExist = await userModel.findOne({ email });

  if (userExist) {
    res.status(400);
    throw new Error(
      `${email} is already in use, please use a different E-mail`
    );
  }

  const verificationToken = Math.floor(100000 + Math.random() * 900000).toString()

  const user = await userModel.create({
    firstName,
    lastName,
    email,
    password,
    verificationToken,
    verificationTokenExpiresAt: Date.now() + 10 * 60 * 1000, // 10 minutes


  });
  // Create a new user instance
  // - Another way of creating it
  // const newUser = new User({
  //   username: "john_doe",
  //   email: "john@example.com",
  // });

  const mailOptions = {
    from: "miahajaz@gmail.com", // sender address
    to: "miahajaz@gmail.com ", // list of receivers
    subject: "Hello ✔", // Subject line
    text: "Hi welcoome , below the the 6 digit verification code. Enter it when prompt?", // plain text body
    html: `<b>This is the verification code ${verificationToken}</b>`, // html body
  };

  sendMail(transporter,mailOptions)

  if (user) {
    generateToken(res, user._id);
    res.status(201).json({
      _id: user._id,
      firstName: user.firstName,
      lastName: user.lastName,
      email: user.email,
      isVerified: user.isVerified
      
    });
  } else {
    res.status(400);
    throw new Error("Could not create an account - please try again later..");
  }
});

//Confirm Email with Code sent 
const confirmEmail = asyncHandler(async (req,res,next) => {

})

const singin = asyncHandler(async (req, res, next) => {
  const { email, password } = req.body;

  const user = await userModel.findOne({ email });

  if (user && (await user.matchPassword(password))) {
    generateToken(res, user._id);

    if (user.profilePicture) {
      let presignedURL = null;

      presignedURL = await getFileFromS3(user.profilePicture, "profilePic");
      user.profilePicture = presignedURL;
      res.status(201).json({
        _id: user._id,
        firstName: user.firstName,
        lastName: user.lastName,
        email: user.email,
        profilePicture: presignedURL,
        bio: user.bio,
      });
    }

    res.status(201).json({
      _id: user._id,
      firstName: user.firstName,
      lastName: user.lastName,
      email: user.email,
      bio: user.bio,
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

const updateUser = asyncHandler(async (req, res, next) => {
  const updateForm = req.body;
  const userId = updateForm._id;

  console.log("REQ BODY", req.body);
  console.log(req?.file, "FILE");

  const firstName = updateForm.firstName;
  const lastName = updateForm.lastName;
  const email = updateForm.email;
  const bio = updateForm.bio;
  const password = updateForm.password;
  const confirmPassword = updateForm.confirmPassword;

  const user = await userModel.findById(userId);

  if (user) {
    user.firstName = firstName || user.firstName;
    user.lastName = lastName || user.lastName;
    user.email = email || user.email;
    user.bio = bio || user.bio;

    if (req?.file) {
      user.profilePicture = req?.file;
      const optimizedBuffer = await optimizeImage(
        req.file.buffer,
        "profilePicture"
      );

      await uploadToS3(optimizedBuffer, user.profilePicture, "profilePic");
    }

    if (password) {
      user.password = password;
      user.confirmPassword = confirmPassword;
    }

    const updatedUser = await user.save();

    if (updateUser) {
      let presignedURL = null;

      presignedURL = await getFileFromS3(user.profilePicture, "profilePic");

      res.status(200).json({
        _id: updatedUser._id,
        firstName: updatedUser.firstName,
        lastName: updatedUser.lastName,
        email: updatedUser.email,
        profilePicture: presignedURL,
        bio: updateUser.bio,
      });
    }
  } else {
    res.status(404);
    throw new Error("USER NOT FOUND!");
  }
});

// public profile -
const userPublicProfile = asyncHandler(async (req, res, next) => {
  const id = req.params.id;

  const blogs = await blogModel.find({ authorId: id });

  const authorInfo = await userModel
    .findById(id)
    .select("-password -confirmPassword");

  if (!authorInfo) {
    throw new Error("This user profile is unavailable");
  }
  let presignedURL = null;
  let SignedPosts = null;

  if (blogs && authorInfo) {
   if(authorInfo.profilePicture) {
    presignedURL = await getFileFromS3(authorInfo.profilePicture, "profilePic");
   }
    SignedPosts = await attachPresignedURLs(blogs);
  }

  authorInfo.profilePicture = presignedURL;

  res.status(200).json({ SignedPosts, authorInfo });
});

export { signup, singin, logout, updateUser, userPublicProfile, confirmEmail };
