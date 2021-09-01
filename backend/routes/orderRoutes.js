import express from "express";
const router = express.Router();
import {
  createOrder,
  getOrderById,
  updateOrderToPaid,
  updateOrderToDelivered,
  getMyOrders,
  getAllOrders,
  updateOrderStatus,
} from "../controllers/orderController.js";
import { protect, admin } from "../middleware/authMiddleware.js";

router.route("/").post(createOrder);
router.route("/").get(getAllOrders);
router.route("/myorders/:id").get(getMyOrders);
router.route("/:id").get(getOrderById);
router.route("/:id/pay").put(updateOrderToPaid);
router.route("/:id/status/:status").put(updateOrderStatus);
router.route("/:id/deliver").put(updateOrderToDelivered);

export default router;
