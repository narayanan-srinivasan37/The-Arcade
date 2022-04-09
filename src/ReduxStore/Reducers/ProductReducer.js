import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { allProducts, getProductById } from "../../API_CALLS/Products";

const initialState = {
  isLoading: true,
  products: [],
  error: null,
};

export const getallProducts = createAsyncThunk(
  "product/allProducts",
  async (param, thunkAPI) => {
    try {
      const response = await allProducts();

      return response;
    } catch (err) {
      throw err;
    }
  }
);
export const productById = createAsyncThunk(
  "product/singleProduct",
  async (id, thunkAPI) => {
    try {
      const response = await getProductById(id);

      return response;
    } catch (err) {
      throw err;
    }
  }
);

const productsSlice = createSlice({
  name: "product",
  initialState: initialState,
  reducers: {},
  extraReducers: {
    [getallProducts.pending]: (state, action) => {
      state.isLoading = true;
    },
    [getallProducts.fulfilled]: (state, action) => {
      state.products = action.payload;
      state.isLoading = false;
    },
    [getallProducts.rejected]: (state, action) => {
      state.error = action.payload;
      state.isLoading = false;
    },
    [productById.pending]: (state, action) => {
      state.isLoading = true;
    },
    [productById.fulfilled]: (state, action) => {
      state.products = action.payload;
      state.isLoading = false;
    },
    [productById.rejected]: (state, action) => {
      state.error = action.payload;
      state.isLoading = false;
    },
  },
});

export const productsReducer = productsSlice.reducer;
