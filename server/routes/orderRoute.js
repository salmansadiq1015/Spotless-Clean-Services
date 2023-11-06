import express from "express";

import {
  chageStatusController,
  deleteOrderController,
  getOrderController,
  postOrderController,
} from "../controllers/orderController.js";

const router = express.Router();

// Post Order
router.post("/payment", postOrderController);

// Get Order
router.get("/get-order", getOrderController);

// Change Status
router.put("/change-status/:id", chageStatusController);

// Delete Order
router.delete("/delete-order/:id", deleteOrderController);

export default router;
