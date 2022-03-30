const express = require("express");
const router = express.Router();

// Importing Controllers
const productController = require("./../controller/productController");
// const authController = require("./../controller/authController");

router
  .route("/")
  .get(productController.getAllProducts)
  .post(productController.createProduct);

module.exports = router;
