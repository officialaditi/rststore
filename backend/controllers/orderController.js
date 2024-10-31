import asyncHandler from "express-async-handler";
import Order from "../models/orderModel.js";

/**
 *  @desc       create new order
 *  @route      POST /api/orders/
 *  @access     private
 */

const createOrder = asyncHandler(async (req, res) => {
  const {
    orderItems,
    shippingPrice,
    paymentMethod,
    itemsPrice,
    taxPrice,
    shippingAddress,
    totalPrice,
  } = req.body;

  if (orderItems && orderItems.length === 0) {
    res.status(400);
    throw new Error("No order items");
  } else {
    const order = new Order({
      orderItems,
      user: req.user._id,
      shippingAddress,
      shippingPrice,
      itemsPrice,
      taxPrice,
      totalPrice,
    });
    const createdOrder = await order.save();
    res.status(201).json(createdOrder);
  }
});

export {createOrder};