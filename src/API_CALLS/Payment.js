import API from "./client";

export const payment = async (total, email) => {
  try {
    const response = await API.post("/payment", {
      amount: total,
      email,
    });
    
    return response.data;
  } catch (err) {
    throw new Error(err);
  }
};
