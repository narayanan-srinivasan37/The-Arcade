import API from "./client";

export const payment = async (total, email, address) => {
  try {
    const response = await API.post("/payment", {
      amount: total,
      email,
      address
    });
    
    return response.data;
  } catch (err) {
    throw new Error(err);
  }
};

export const paymentSuccess = async(orderid)=>{
try{
  const response = await API.get(`/payment/success/${orderid}`);
  return response;
}
catch(err){
  throw new Error(err);
}
}

export const paymentFailure = async(orderid)=>{
  try{
    const response = await API.get(`/payment/failure/${orderid}`);

  }
  catch(err)
  {
    throw new Error(err)
  }
}
