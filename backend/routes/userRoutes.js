import express from "express";
import { protect, admin } from "../middlewares/authMiddleware.js";
import {
  deleteUser,
  getUserProfile,
  getUsers,
  Login,
  registerUser,
  updateProfile,
} from "../controllers/userController.js";

const router = express.Router();

router.route("/").post(registerUser).get(protect, admin, getUsers);
router.route("/login").post(Login);
router
  .route("/profile")
  .get(protect, getUserProfile)
  .put(protect, updateProfile);
router.route('/:id').delete(protect, admin,  deleteUser);

export default router;
