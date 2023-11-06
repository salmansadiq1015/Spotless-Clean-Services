import express from "express";
import formidable from "express-formidable";
import {
  allUserController,
  createAuthController,
  deleteUserController,
  forgotPasswordController,
  loginController,
  singleUserController,
  updateProfileController,
  userCoverController,
  userPhotoController,
} from "../controllers/authController.js";
import { isAdmin, requireSignin } from "../middlewares/authMiddleware.js";

const router = express.Router();

// Create User
router.post("/create-user", formidable(), createAuthController);

// Login Router
router.post("/login-user", loginController);

// Forgot Password
router.post("/forgot-password", forgotPasswordController);

// Update Profile
router.put(
  "/update-profile/:id",
  requireSignin,
  formidable(),
  updateProfileController
);

// All User
router.get("/all-user", allUserController);

// Get Single User
router.get("/single-user/:id", singleUserController);

// Delete Users
router.delete("/delete-user/:id", requireSignin, isAdmin, deleteUserController);

// Protected Routes
router.get("/user-auth", requireSignin, (req, res) => {
  res.status(200).send({ ok: true });
});

// Protected Admin Route
router.get("/admin-auth", requireSignin, isAdmin, (req, res) => {
  res.status(200).send({ ok: true });
});

// Get User Photo
router.get("/user-photo/:id", userPhotoController);

// Get COver Photo
router.get("/cover-photo/:id", userCoverController);

// Export
export default router;
