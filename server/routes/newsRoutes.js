import express from "express";
import {
  createNewsController,
  deleteNewsController,
  getNewsController,
} from "../controllers/newsController.js";

const router = express.Router();

// Routes
// Create-News
router.post("/create-news", createNewsController);
// Get All News
router.get("/get-news", getNewsController);

// Delete News
router.delete("/delete-news/:id", deleteNewsController);

export default router;
