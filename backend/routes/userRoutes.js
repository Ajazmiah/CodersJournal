import express from "express";
import { protect } from "../middleware/authMIddleware.js";
import { check, body } from "express-validator";

import {
  singin,
  signup,
  logout,
  updateUser,
  userPublicProfile,
} from "../controllers/userController.js";
import multer from "multer";

const router = express.Router();

const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

// router.get("/", home);
router.post(
  "/signup",
  upload.single("profilePicture"),
  [
    check("email").isEmail().normalizeEmail(),
    body(
      "password",
      "Make sure password is at least 8 character long and contains only letters , numbers and these special characters [!, &, @, _, ]"
    )
      .isLength({ min: 8 })
      .matches(/^[A-Za-z0-9 .,'!&@_]+$/),
  ],
  body("confirmPassword").custom((value, { req }) => {
    if (value !== req.body.confirmPassword) {
      throw new Error("password and confirm password has to match");
    } else {
      return true;
    }
  }),
  signup
);

router.post("/signin", singin);

router.post("/logout", logout);

// router.route("/profile").get(protect, getUserProfile);

router.route("/profile/update").put(
  protect,
  upload.single("profilePicture"),
  [
    check("email").isEmail().normalizeEmail(),
    body(
      "password",
      "Make sure password is at least 8 character long and contains only letters , numbers and these special characters [!, &, @, _, ]"
    )
      .isLength({ min: 8 })
      .matches(/^[A-Za-z0-9 .,'!&@_]+$/),
  ],
  body("confirmPassword").custom((value, { req }) => {
    if (value !== req.body.confirmPassword) {
      throw new Error("password and confirm password has to match");
    } else {
      return true;
    }
  }),
  updateUser
);

router.get("/author/:id", userPublicProfile);

export default router;
