const Order = require("../models/orderModel");
const dotenv = require("dotenv");
const Razorpay = require("razorpay");
dotenv.config({ path: "./../config.env" });
const catchAsync = require("./../utils/catchAsync");

exports.razorpayKey = (req, res) => {
  res.send({ key: process.env.RAZORPAY_KEY_ID });
};

exports.createOrder = async (req, res) => {
  try {
    const instance = new Razorpay({
      key_id: process.env.RAZORPAY_KEY_ID,
      key_secret: process.env.RAZORPAY_SECRET,
    });
    const options = {
      amount: req.body.amount,
      currency: "INR",
    };
    const order = await instance.orders.create(options);
    if (!order) return res.status(500).send("Some error occured");
    res.send(order);
  } catch (error) {
    res.status(500).send(error);
  }
};

exports.payOrder = async (req, res) => {
  try {
    const {
      amount,
      razorpayPaymentId,
      razorpayOrderId,
      razorpaySignature,
      orderedItems,
      deliveryAddress,
      user,
    } = req.body;

    const newPayment = Order({
      isPaid: true,
      orderedDate: Date.now(),
      amount: amount,
      razorpay: {
        orderId: razorpayOrderId,
        paymentId: razorpayPaymentId,
        signature: razorpaySignature,
      },
      orderedItems: orderedItems,
      deliveryAddress: deliveryAddress,
      user: user,
    });
    await newPayment.save();
    res.status(200).json({
      status: "success",
      message: "Payment Successfull",
    });
  } catch (error) {
    res.status(500).send(error);
  }
};

exports.getAllOrders = catchAsync(async (req, res, next) => {
  const orders = await Order.find();
  res.status(200).json({
    status: "success",
    data: {
      orders,
    },
  });
});
