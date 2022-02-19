import API from "./client";

export const getOrders = async (orderid) => {
  try {
    const response = await API.get(`/order/${orderid}`);
    return response.data;
  } catch (err) {
    throw err;
  }
};
