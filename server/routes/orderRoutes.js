const {
  findOrderItemsById,
} = require("../Helper_Functions/OrderItemsFunctions");
const orderRoutes = require("express").Router();

orderRoutes.get("/:orderId", async (req, res, next) => {
  try {
    const { orderId } = req.params;
    const orderItems = findOrderItemsById(orderId);
    res.statusCode(200).send(orderItems);
  } catch (err) {
    next(err);
  }
});

module.exports = orderRoutes;
