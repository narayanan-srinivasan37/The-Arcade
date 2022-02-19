import { configureStore } from "@reduxjs/toolkit";
import { authReducer } from "./Reducers/AuthReducer";
import { blogReducer } from "./Reducers/BlogReducer";
import { newsReducer } from "./Reducers/NewsReducer";
import { productsReducer } from "./Reducers/ProductReducer";
import { cartReducer } from "./Reducers/CartReducer";
import { orderReducer } from "./Reducers/OrderReducer";
const reducer = {
  blog: blogReducer,
  auth: authReducer,
  news: newsReducer,
  products: productsReducer,
  cart: cartReducer,
  order: orderReducer,
};
export const store = configureStore({
  reducer,
});
