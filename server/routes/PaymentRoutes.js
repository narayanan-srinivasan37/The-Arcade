const paymentRoutes = require("express").Router();

const payment = require("../Helper_Functions/PaymentFunctions");

paymentRoutes.post("/", async (req, res, next) => {
  try {
    const { amount, email, address } = req.body;

    const response = await payment(amount, email, address);
    console.log(response);
    res.json(response);
  } catch (error) {
    next(error);
  }
});

module.exports = paymentRoutes;
