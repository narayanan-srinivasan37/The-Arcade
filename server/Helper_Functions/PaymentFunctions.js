const Stripe = require("stripe");
const { STRIPE_SECRET_KEY } = require("../config");
const stripe = new Stripe(STRIPE_SECRET_KEY);
const createError = require("http-errors");
const { createOrder, updateStatus } = require("./OrderFunctions");
const { createOrderItems } = require("./OrderItemsFunctions");
const { getCartItems } = require("./CartItemFunctions");
const payment = async (amount, email, userId) => {
  try {
    const orderCreation = await createOrder({ total: amount, userid: userId });
    const order = await getCartItems(userId);
    await order.rows.map((item) => {
      return  createOrderItems({
        orderId: orderCreation.rows[0].id,
        ...item,
      });
    });
    const result = await stripe.paymentIntents.create({
      amount,
      currency: "inr",
      payment_method_types: ["card"],
      receipt_email: email,
      metadata: { integration_check: "accept_a_payment" },
    });
    const statusUpdate = updateStatus({ status: "Complete", userid: userId });
    return result;
  } catch (error) {
    throw createError(error.StatusCode, error.messageF);
  }
};

module.exports = payment;
