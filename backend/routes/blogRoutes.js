import express from "express";
import { check, body } from "express-validator";
import {
  createPost,
  getBlogs,
  getPost,
  allPost,
  deletePost
} from "../controllers/blogController.js";
import { protect } from "../middleware/authMIddleware.js";
const router = express.Router();


router.route("/allPost").get(allPost)
router.route("/create").post(protect,[
  check('summary', 'Summary is required').notEmpty(),
  check('title', 'Title is required').notEmpty(),
  check('body', 'Body is required').notEmpty(),
],createPost).get(protect, getBlogs);
router.post("/post" , getPost);
router.post("/deletepost" , deletePost)


export default router;
