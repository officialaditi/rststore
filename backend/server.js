import express from "express";
import products from "./data/products.js";

const app = express();

app.get("/", (req, res) => {
  res.send("Api is running...");
});

app.get('/api/products', (req, res) => {
    res.json(products);
})

app.get('/api/products/:id', (req, res) => {
    const product = products.find((prod) => prod._id === req.params.id);
    res.json(product)
})

app.listen(3000, () => {
  console.log("Server Started on port 3000");
});
