const {
  findOrderItemsById,findOrderItemsByUserId
} = require("../Helper_Functions/OrderItemsFunctions");
const orderRoutes = require("express").Router();
const { deleteOrderById } = require("../Helper_Functions/OrderFunctions");
orderRoutes.get("/:orderId", async (req, res, next) => {
  try {
    const { orderId } = req.params;
    const orderItems = findOrderItemsById(orderId);
    res.status(200).send(orderItems);
  } catch (err) {
    next(err);
  }
});

orderRoutes.get("/", async(req, res, next)=>{
  try {
    const { userId } = req.session
    const orderItems = await findOrderItemsByUserId(userId);
    
    res.status(200).send(orderItems);
  } catch (err) {
    next(err);
  }
})


orderRoutes.delete("/:id", async (req, res, next) => {
  try {
    const { id } = req.params;
    const orderItems = deleteOrderById(id);
    res.status(204).send(orderItems);
  } catch (err) {
    next(err);
  }
});

module.exports = orderRoutes;
