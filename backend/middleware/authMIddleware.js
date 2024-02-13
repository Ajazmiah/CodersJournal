import jwt from "jsonwebtoken";
import asyncHandler from "express-async-handler";
import User from "../models/userModel.js";
import { verifytoken } from "../utils/verifyToken.js";

const protect = asyncHandler(async (req, res, next) => {
  // let token;

  // token = req.cookies.jwt;
  //jwt.verify(token, process.env.JWT_SECRET);
  const decoded = verifytoken(req);

  if (decoded) {
    try {
      //  const decoded = verifytoken(req)

      req.user = await User.findById(decoded.userId).select("-password");

      next();
    } catch (error) {
      console.error(error);
      res.status(401);
      throw new Error("Not authorized, token failed");
    }
  } else {
    res.status(401);
    throw new Error("Not authorized, no token");
  }
});

export { protect };
