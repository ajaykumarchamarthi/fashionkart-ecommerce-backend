const express = require("express");
const router = express.Router();

// Importing authController
const authController = require("./../controller/authController");
const userController = require("./../controller/userController");

router.route("/").get(userController.getAllUsers);

router.route("/signup").post(authController.signup);

router.route("/login").post(authController.login);

router.route("/forgotPassword").post(authController.forgotPassword);

router.route("/resetPassword/:token").patch(authController.resetPassword);

router
  .route("/updateMyPassword")
  .patch(authController.protect, authController.updatePassword);

module.exports = router;
