import express from "express";
import {
  createCommentController,
  deleteCommentController,
  getCommentController,
} from "../controllers/commentController.js";
const router = express.Router();

// Post commment
router.post("/create-comment", createCommentController);

// Post commment
router.get("/get-comment", getCommentController);

// Post commment
router.delete("/delete-comment/:id", deleteCommentController);

export default router;
