import express from "express";
import protect from "../middlewares/authMiddleware.js";
import {
  getUserProfile,
  Login,
  registerUser,
  updateProfile,
} from "../controllers/userController.js";

const router = express.Router();

router.route("/").post(registerUser);
router.route("/login").post(Login);
router
  .route("/profile")
  .get(protect, getUserProfile)
  .put(protect, updateProfile);

export default router;
