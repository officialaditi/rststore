import express from 'express';
import { createOrder } from '../controllers/orderController.js';
import {protect} from '../middlewares/authMiddleware.js';

const router = express.Router();

router.route('/').post(protect, createOrder);
export default router;