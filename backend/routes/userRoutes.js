import express from "express";
import { protect } from "../middleware/authMIddleware.js";
import { check, body } from "express-validator";

import {
  home,
  singin,
  signup,
  logout,
  getUserProfile,
  updateUser,
} from "../controllers/userController.js";

const router = express.Router();

// router.get("/", home);
router.post("/signup",[check('email').
       isEmail().normalizeEmail(), 
       body('password', 'Please enter a valid password').
       isLength({min:8})], body('confirmPassword').custom((value, {req}) => {
 if(value !== req.body.confirmPassword) {
  throw new Error('password and confirm password has to match')
 } else {
  return true
 }
}) ,signup);

router.post("/signin", singin);

router.post("/logout", logout);

router.route("/profile").get(protect, getUserProfile);

router.route("/profile/update").put(protect, updateUser);

export default router;
