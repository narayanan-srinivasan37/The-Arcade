import API from "./client";

export const allCartItems = async (id) => {
  try {
    const response = await API.get("/cart", {
      id,
    });
   
    return response.data;
  } catch (err) {
    throw err;
  }
};

export const addCartItem = async (data) => {
  try {
    const response = await API.post("/cart", {
      ...data,
    });
    return response.data;
  } catch (err) {
    throw err;
  }
};

export const deleteCartItem = async (params) => {
  try {
    const response = await API.delete(
      `/cart/${params.product_id}/${params.cart_id}`
    );
    console.log(response.data)
    return response.data;
  } catch (err) {
    throw err;
  }
};

export const updateCartItem = async (params) => {
  try {
    const response = await API.put(`/cart/${params.product_id}`, {
      cart_id: params.cart_id,
      quantity: params.quantity,
    });
    return response.data;
  } catch (err) {
    throw err;
  }
};
