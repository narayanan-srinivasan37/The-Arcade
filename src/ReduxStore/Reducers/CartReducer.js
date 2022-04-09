import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import {
  allCartItems,
  addCartItem,
  deleteCartItem,
  updateCartItem,
} from "../../API_CALLS/Cart";

const initialState = {
  isLoading: true,
  cart: [],
  error: null,
};

export const getAllCartItems = createAsyncThunk(
  "/cart/getallCartItems",
  async (params, thunkAPI) => {
    const state = thunkAPI.getState();
    const response = await allCartItems(params);
    return response;
  }
);

export const addACartItem = createAsyncThunk(
  "cart/addAcartItem",
  async (params, thunkAPI) => {
    const state = thunkAPI.getState();
    const response = await addCartItem(params);
    return response;
  }
);

export const updateACartItem = createAsyncThunk(
  "cart/updateCartItem",
  async (params, thunkAPI) => {
    const state = thunkAPI.getState();
    
    const response = await updateCartItem(params);
    return response;
  }
);

export const deleteACartItem = createAsyncThunk(
  "cart/deleteCartItem",
  async (params, thunkAPI) => {
    const state = thunkAPI.getState();
    const response = await deleteCartItem(params);
    return response;
  }
);

const cartSlice = createSlice({
  name: "cart",
  initialState: initialState,
  reducers: {},
  extraReducers: {
    [getAllCartItems.fulfilled]: (state, action) => {
      state.isLoading = false;
      state.cart = action.payload;
    },
    [getAllCartItems.rejected]: (state, action) => {
      state.isLoading = false;
      state.error = action.payload;
    },
    [addACartItem.fulfilled]: (state, action) => {
      state.isLoading = false;
      state.cart = action.payload;
    },
    [addACartItem.rejected]: (state, action) => {
      state.isLoading = false;
      state.error = action.payload;
    },
    [updateACartItem.fulfilled]: (state, action) => {
      state.isLoading = false;
      state.cart = action.payload;
    },
    [updateACartItem.rejected]: (state, action) => {
      state.isLoading = false;
      state.error = action.payload;
    },
    [deleteACartItem.fulfilled]: (state, action) => {
      state.isLoading = false;
      state.cart = action.payload;
    },
    [deleteACartItem.rejected]: (state, action) => {
      state.isLoading = false;
      state.error = action.payload;
    },
  },
});

export const cartReducer = cartSlice.reducer;
