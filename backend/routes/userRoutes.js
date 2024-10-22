import express from "express";
import protect from "../middlewares/authMiddleware.js";
import { getUserProfile, Login } from "../controllers/userController.js";

const router = express.Router();

router.route("/login").post(Login);
router.route("/profile").get(protect, getUserProfile);

export default router;
