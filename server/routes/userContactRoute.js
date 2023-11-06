import exress from "express";
import {
  createInformationController,
  deleteInformationController,
  getInformationController,
} from "../controllers/userInformationController.js";

const route = exress.Router();

// Post
route.post("/create-message", createInformationController);

// Get User information Route
route.get("/get-message", getInformationController);

// Delete User information Route
route.delete("/delete-message/:id", deleteInformationController);

// Export
export default route;
