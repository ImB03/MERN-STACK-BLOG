import express from "express";

import {
  getAllPosts,
  getOnePost,
  createPost,
  updatePost,
  deletePost,
  likePost,
  commentPost,
} from "../controllers/posts.js";
import auth from "../middleware/auth.js";

const router = express.Router();

router.get("/", getAllPosts);
router.get("/:postId", getOnePost);
router.post("/", auth, createPost);
router.patch("/:postId", auth, updatePost);
router.delete("/:postId", auth, deletePost);
router.patch("/likepost/:postId", auth, likePost);
router.patch("/commentpost/:postId", commentPost);

export default router;
