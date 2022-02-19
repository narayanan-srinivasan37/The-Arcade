import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { getOrders } from "../../API_CALLS/Orders";

const initialState = {
  isLoading: true,
  orders: [],
  error: null,
};
export const getAllOrders = createAsyncThunk(
  "order/getAllOrders",
  async (params, thunkAPI) => {
    const response = await getOrders(params);
    return response;
  }
);

const orderSlice = createSlice({
  name: "order",
  initialState,
  reducers: {},
  extraReducers: {
    [getAllOrders.fulfilled]: (state, action) => {
      state.orders = state.payload;
      state.isLoading = false;
    },
    [getAllOrders.rejected]: (state, action) => {
      state.isLoading = false;
      state.orders = [];
      state.error = action.payload;
    },
  },
});

export const orderReducer = orderSlice.reducer;
