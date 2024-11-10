import asyncHandler from "express-async-handler";
import Product from "../models/productModel.js";

/**
 *    @desc      Get all Product
 *    @route     GET ==>  /api/products/
 *    @access    PUBLIC
 */

const getProducts = asyncHandler(async (req, res) => {
  const products = await Product.find({});
  res.json(products);
});

/**
 *   @desc      Get single product by ID
 *   @route     GET ==> /api/product/:id
 *   @access    PUBLIC
 */

const getProductById = asyncHandler(async (req, res) => {
  const product = await Product.findById(req.params.id);
  if (product) {
    res.json(product);
  } else {
    res.status(404).json({ message: "Product Not Found" });
  }
});

/**
 *   @desc    delete product (admin)
 *   @route   DELETE /api/products/:id
 *   @access  private/admin
 */

const deleteProduct = asyncHandler(async (req, res) => {
  const product = await Product.findById(req.params.id);
  if (product) {
    await Product.deleteOne(product);
    res.json({ message: "Product Deleted" });
  } else {
    res.status(404);
    throw new Error("Product not Found");
  }
});

export { getProducts, getProductById, deleteProduct };
