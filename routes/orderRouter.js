const express = require("express");
const router = express.Router();

const orderController = require("./../controller/orderController");

router.route("/get-razorpay-key").get(orderController.razorpayKey);
router.route("/list-orders").get(orderController.getAllOrders);
router.route("/create-order").post(orderController.createOrder);
router.route("/pay-order").post(orderController.payOrder);

module.exports = router;
