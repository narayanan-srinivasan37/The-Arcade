const express = require("express");
const cartRoutes = express.Router();
const {
  getCartItems,
  addCartItems,
  deleteCartItem,
  updateCartItem,
} = require("../Helper_Functions/CartItemFunctions");
cartRoutes.get("/", async (req, res, next) => {
  try {
    const userId = req.session.userId;
    if (req.query) {
      const cartItems = await getCartItems(userId);

      res.status(200).send(cartItems);
    } else {
      res.status(200).send([]);
    }
  } catch (err) {
    next(err);
  }
});

cartRoutes.post("/", async (req, res, next) => {
  try {
    const { cart_id, product_id, quantity } = req.body;
    const cartItems = await addCartItems(cart_id, product_id, quantity);

    res.status(201).send(cartItems);
  } catch (err) {
    next(err);
  }
});

cartRoutes.put("/:product_id", async (req, res, next) => {
  try {
    const { product_id } = req.params;
    const { cart_id, quantity } = req.body;
    const cartItems = await updateCartItem(cart_id, product_id, quantity);

    res.status(201).send(cartItems);
  } catch (err) {
    next(err);
  }
});

cartRoutes.delete("/:product_id/:cart_id", async (req, res, next) => {
  try {
    const { product_id, cart_id } = req.params;
    const cartItems = await deleteCartItem(cart_id, product_id);
   
    res.status(201).send(cartItems);
  } catch (err) {
    next(err);
  }
});

module.exports = cartRoutes;
