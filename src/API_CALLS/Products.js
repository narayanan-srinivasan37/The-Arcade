import API from "./client";

export const allProducts = async () => {
  const response = await API.get("/product");
  return response.data;
};

export const getProductById = async (id) => {
  const response = await API.get(`/product/${id}`);
  return response.data;

};
