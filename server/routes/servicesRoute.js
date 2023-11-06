import express from "express";
import { isAdmin, requireSignin } from "../middlewares/authMiddleware.js";
import formidable from "express-formidable";
import {
  createServicesController,
  deleteServicesController,
  getPhotoController,
  getServicesController,
  singleServicesController,
  updateServicesController,
} from "../controllers/servicesController.js";

const router = express.Router();

// Routes

// Create Services Route
router.post(
  "/create-services",
  requireSignin,
  isAdmin,
  formidable(),
  createServicesController
);

// Get Services Route
router.get("/get-services", getServicesController);

// Update Services Route
router.put(
  "/update-service/:id",
  requireSignin,
  isAdmin,
  formidable(),
  updateServicesController
);

// Delete Services Route
router.delete(
  "/delete-service/:id",
  requireSignin,
  isAdmin,
  deleteServicesController
);

// Single Services Route
router.get("/single-service/:id", singleServicesController);

// Photo Route
router.get("/service-route/:id", getPhotoController);

export default router;
