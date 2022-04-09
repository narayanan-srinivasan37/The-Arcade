const paymentRoutes = require("express").Router();

const {payment , paymentSuccess, paymentFailure}= require("../Helper_Functions/PaymentFunctions");

paymentRoutes.post("/", async (req, res, next) => {
  try {
    const { userId } = req.session;
    const { amount, email, address } = req.body;
    const response = await payment(amount, email, userId, address);
    
    res.json(response);
  } catch (error) {
    next(error);
  }
});

paymentRoutes.get("/success/:orderid", async(req, res, next)=>{
  try{
  const {userId} = req.session;
  const {orderid} = req.params
 
  const response = await paymentSuccess(userId, orderid);
  return res.status(200).send(response)
} 
  catch(err)
  {
    next(err)
  }

})
paymentRoutes.get("/failure/:orderid", async(req, res, next)=>{
  try{
  const {userId} = req.session;
  const {orderid} = req.params

  const response = await paymentFailure(userId, orderid);
  return res.status(500).send(response)
}
catch(err)
{
  next(err)
}
})
module.exports = paymentRoutes;
