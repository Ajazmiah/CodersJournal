import express from "express";
import { check, body } from "express-validator";
import {
  createPost,
  getAllUserPosts,
  getPost,
  allPost,
  deletePost,
  editPost,
  getUserPosts
} from "../controllers/blogController.js";
import { protect } from "../middleware/authMIddleware.js";
import multer from "multer";
const router = express.Router();

const storage = multer.memoryStorage()
const upload = multer({ storage: storage })


router.route("/allPost").get(allPost)
router.route("/create").post(protect, upload.single('coverImage'),[
  check('summary', 'Summary is required').notEmpty(),
  check('title', 'Title is required').notEmpty(),
  check('QuillValue', 'Body is required').notEmpty(),
],createPost).get(protect, getAllUserPosts);
router.route('/getUserPosts').get(getUserPosts)
router.post('/edit',upload.single('coverImage'), editPost)
router.get("/post/:id" , getPost);
router.post("/deletepost" , deletePost)



export default router;
