import API from "./client";

export const getOrders = async () => {
  try {
    const response = await API.get("/order");
    return response.data;
  } catch (err) {
    throw err;
  }
};
