import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { login, register, isLoggedIn, logoutUser } from "../../API_CALLS/Auth";
import { getAllCartItems } from "./CartReducer";

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
      await thunkAPI.dispatch(getAllCartItems(response.user_id));
      return {
        user: response,
      
      };
    } catch (err) {
    throw thunkAPI.rejectWithValue(err)
      
    }
  }
);

export const registerUser = createAsyncThunk(
  "auth/register",
  async (credentials, thunkAPI) => {
    try {
      const response = await register(credentials);
      await thunkAPI.dispatch(getAllCartItems(response.id));
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
      await thunkAPI.dispatch(getAllCartItems(response.user.user_id));
      return {
        user: response.user,   
      };
    } catch (err) {
      await thunkAPI.dispatch(getAllCartItems());
      throw err
    }
  }
);

export const logOutUser = createAsyncThunk(
  "auth/logout",
  async (param, thunkAPI) => {
    try {
      const response = await logoutUser();
      await thunkAPI.dispatch(getAllCartItems());
      return response;
    } catch (err) {
      throw err;
    }
  }
);

 const authSlice = createSlice({
  name: "auth",
  initialState: initialState,
  reducers: {},
  extraReducers: {
    [loginUser.fulfilled]: (state, action) => {
      const { user } = action.payload;
      state.isLoading = false;
      state.isAuthenticated = true;
      state.user = { ...user };
    },
    [loginUser.rejected]: (state, action) => {
      const {message} = action.payload
      
      state.isLoading = false;
      state.error = message
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
      state.user = { ...action.payload.user };
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
    [logOutUser.rejected]: (state, action) => {
      state.isLoading = false;
      state.isAuthenticated = false;
      state.error = action.payload;
    },
  },
});

export const authReducer = authSlice.reducer;
