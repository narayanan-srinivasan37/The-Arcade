const Stripe = require("stripe");
const { STRIPE_SECRET_KEY } = require("../config");
const stripe = new Stripe(STRIPE_SECRET_KEY);
const createError = require("http-errors");
const { createOrder, updateStatus } = require("./OrderFunctions");
const { createOrderItems } = require("./OrderItemsFunctions");
const { getCartItems , deleteItems} = require("./CartItemFunctions");
const {findOneByUserId} = require('./CartFunctions')
const payment = async (amount, email, userId, address) => {
  try {
    const orderCreation = await createOrder({ total: amount, userid: userId , address:address});
    const order = await getCartItems(userId);
    const result = await stripe.paymentIntents.create({
      amount: amount * 100,
      currency: "inr",
      payment_method_types: ["card"],
      receipt_email: email,
      metadata: { integration_check: "accept_a_payment" },
    });
  
    return {result, orderId:orderCreation[0].id};
  } catch (error) {
    throw createError(error.StatusCode, error.messageF);
  }
};

const paymentSuccess = async (userid, orderid) => {
  try {
   
    const order = await getCartItems(userid);
  
    await order.map(async (item, index) => {
      try {
        
        const data = {
          userId:userid,
          orderId: orderid,
          ...item,
        };
     
        return await createOrderItems(data);
      } catch (err) {
        throw createError(500, err);
      }
    });
    const statusUpdate = updateStatus({ status: "Completed", userid: userid, orderid:orderid });
  const cartId = await findOneByUserId(userid)
 
  const deleteCart = await deleteItems(cartId.id)
  } catch (err) {
    throw createError(500, err);
  }
};
const paymentFailure = async(userid, orderid)=>{
  try{

    const statusUpdate = await updateStatus({ status: "Failed", userid: userid,   orderid:orderid });
    return {status:"Payment Failed"};
  }
  catch(err)
  {
    throw createError(500, err)
  }
}

module.exports = { payment, paymentSuccess , paymentFailure};
