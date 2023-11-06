import express from "express";
import {
  createContactController,
  getContactController,
  updateContactController,
} from "../controllers/contactController.js";

const router = express.Router();

// Routes

// Post Contact
router.post("/create-contact", createContactController);
router.get("/get-contact", getContactController);
router.put("/update-contact/:id", updateContactController);

// Export
export default router;
