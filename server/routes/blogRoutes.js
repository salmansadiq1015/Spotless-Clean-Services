import express from "express";
import { isAdmin, requireSignin } from "../middlewares/authMiddleware.js";
import formidable from "express-formidable";
import {
  authImageController,
  bannerImageController,
  createBlogController,
  deleteBlogController,
  getBlogController,
  singleBlogController,
  updateBlogController,
} from "../controllers/blogController.js";

const router = express.Router();

// Create Blog Route
router.post(
  "/create-blog",
  requireSignin,
  isAdmin,
  formidable(),
  createBlogController
);

// Get All Blogs
router.get("/get-blog", getBlogController);

// Upadte Blog
router.put(
  "/update-blog/:id",
  requireSignin,
  isAdmin,
  formidable(),
  updateBlogController
);

// Delete Blog
router.delete(
  "/delete-blog/:id",
  requireSignin,
  isAdmin,
  formidable(),
  deleteBlogController
);

// Get single blog
router.get("/single-blog/:id", singleBlogController);

// Get Image
router.get("/auth-image/:id", authImageController);
router.get("/banner-image/:id", bannerImageController);

export default router;
