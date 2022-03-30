const mongoose = require("mongoose");

const orderSchema = new mongoose.Schema(
  {
    isPaid: Boolean,
    orderedDate: Date,
    amount: Number,
    razorpay: {
      orderId: String,
      paymentId: String,
      signature: String,
    },
    orderedItems: Array,
    deliveryAddress: Object,
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
  },
  {
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  }
);

orderSchema.pre(/^find/, function (next) {
  this.populate({
    path: "user",
    select: "-password -__v -passwordChangedAt -passwordResetToken",
  });
  next();
});

const Order = mongoose.model("Order", orderSchema);
module.exports = Order;
