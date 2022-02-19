import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { login, register, isLoggedIn, logoutUser } from "../../API_CALLS/Auth";

const initialState = {
  isLoading: true,
  isAuthenticated: false,
  error: null,
  user: [],
};

export const loginUser = createAsyncThunk(
  "auth/loginuser",
  async (credentials, thunkAPI) => {
    try {
      const response = await login(credentials);
      return {
        user: response,
        isAuthenticated: true,
      };
    } catch (err) {
      throw err;
    }
  }
);

export const registerUser = createAsyncThunk(
  "auth/register",
  async (credentials, thunkAPI) => {
    try {
      const response = await register(credentials);
      return response;
    } catch (err) {
      throw err;
    }
  }
);

export const checkisLoggedIn = createAsyncThunk(
  "auth/checkLoggedIn",
  async (param, thunkAPI) => {
    try {
      const response = await isLoggedIn();
      return {
        user: response.user,
        isAuthenticated: true,
        cart: response.cart,
      };
    } catch (err) {
      throw err;
    }
  }
);

export const logOutUser = createAsyncThunk(
  "auth/logout",
  async (param, thunkAPI) => {
    try {
      const response = await logoutUser();
      return response;
    } catch (err) {
      throw err;
    }
  }
);

export const authSlice = createSlice({
  name: "auth",
  initialState: initialState,
  reducers: {},
  extraReducers: {
    [loginUser.fulfilled]: (state, action) => {
      state.isLoading = false;
      state.isAuthenticated = true;
      state.user = action.payload;
    },
    [loginUser.rejected]: (state, action) => {
      state.isLoading = false;
      state.error = action.payload;
      state.isAuthenticated = false;
    },
    [registerUser.fulfilled]: (state, action) => {
      state.isLoading = false;
      state.isAuthenticated = true;
      state.user = action.payload;
    },
    [registerUser.rejected]: (state, action) => {
      state.isLoading = false;
      state.isAuthenticated = false;
      state.error = action.payload;
    },
    [checkisLoggedIn.fulfilled]: (state, action) => {
      state.isLoading = false;
      state.isAuthenticated = true;
      state.user = action.payload;
    },
    [checkisLoggedIn.rejected]: (state, action) => {
      state.isLoading = false;
      state.isAuthenticated = false;
      state.user = [];
    },
    [logOutUser.fulfilled]: (state) => {
      state.isLoading = false;
      state.isAuthenticated = false;
      state.user = [];
    },
    [logOutUser.rejected]: (state) => {
      state.isLoading = false;
      state.isAuthenticated = false;
      state.user = [];
    },
  },
});

export const authReducer = authSlice.reducer;
