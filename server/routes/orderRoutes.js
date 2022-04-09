const {
  findOrderItemsById,findOrderItemsByUserId
} = require("../Helper_Functions/OrderItemsFunctions");
const orderRoutes = require("express").Router();
const { deleteOrderById } = require("../Helper_Functions/OrderFunctions");
orderRoutes.get("/:orderId", async (req, res, next) => {
  try {
    const { orderId } = req.params;
    const orderItems = findOrderItemsById(orderId);
    res.statusCode(200).send(orderItems);
  } catch (err) {
    next(err);
  }
});

orderRoutes.get("/:userId", async(req, res, next)=>{
  try {
    const { userId } = req.params;
    const orderItems = findOrderItemsByUserId(userId);
    res.statusCode(200).send(orderItems);
  } catch (err) {
    next(err);
  }
})


orderRoutes.delete("/:id", async (req, res, next) => {
  try {
    const { id } = req.params;
    const orderItems = deleteOrderById(id);
    res.statusCode(204).send(orderItems);
  } catch (err) {
    next(err);
  }
});

module.exports = orderRoutes;
