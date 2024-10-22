import express from "express";

import { Login } from "../controllers/userController.js";

const router = express.Router();

router.route("/login").post(Login);

export default router;
