const express = require("express");
const productRoutes = express.Router();
const {
  getAllProducts,
  updateProducts,
  getProductsByName,
  deleteProducts,
  getProductById,
} = require("../Helper_Functions/ProductFunctions");

productRoutes.get("/", async (req, res, next) => {
  try {
    const response = await getAllProducts();
    res.status(200).send(response);
  } catch (err) {
    next(err);
  }
});

productRoutes.get("/:id", async (req, res, next) => {
  const { id } = req.params;
  
  const response = await getProductById(id);
  res.status(200).send(response)
});

module.exports = productRoutes;
