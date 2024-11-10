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

/*
   @desc       create product (admin);
   @route      POST /api/products
   @access      private/ admin
*/

const createProduct = asyncHandler(async (req, res) => {
  const product = new Product({
    name: "Sample Product",
    price: 0,
    user: req.user._id,
    image: "/images/sample.jpg",
    brand: "Sample brand",
    category: "Sample category",
    countInStock: 0,
    numReviews: 0,
    description: "Sample description",
  });
  const createdProduct = await product.save();
  res.status(201).json(createdProduct);
});

/***
 *    @desc      Updata product (admin);
 *    @route     PUT /api/products/:id;
 *    @access   private/admin
 */
const updateProduct = asyncHandler(async (req, res) => {
  const { name, price, image, description, countInStock, brand, category } =
    req.body;
  const product = await Product.findById(req.params.id);
  if (product) {
    (product.name = name),
      (product.price = price),
      (product.countInStock = countInStock),
      (product.image = image),
      (product.brand = brand),
      (product.category = category);
    product.description = description;
    const updatedProduct = await product.save();
    res.json(updatedProduct);
  } else {
    res.status(404);
    throw new Error("Product not Found.");
  }
});

export {
  getProducts,
  getProductById,
  deleteProduct,
  createProduct,
  updateProduct,
};
