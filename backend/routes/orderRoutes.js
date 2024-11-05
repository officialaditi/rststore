import express from "express";
import {
  createOrder,
  getMyOrders,
  getOrderById,
  updateOrderToPaid,
} from "../controllers/orderController.js";
import {protect} from "../middlewares/authMiddleware.js";
const router = express.Router();

router.route("/").post(protect, createOrder);
router.route('/myorders').get(protect, getMyOrders);
router.route("/:id").get(protect, getOrderById);
router.route("/:id/pay").put(protect, updateOrderToPaid);
export default router;
