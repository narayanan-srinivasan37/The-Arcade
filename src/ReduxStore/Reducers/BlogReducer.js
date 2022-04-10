import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import {
  getAllBlog,
  editABlog,
  postABlog,
  getBlogById,
} from "../../API_CALLS/Blog";

const initialState = {
  isLoading: true,
  blog: [],
  error: null,
};

export const allBlogs = createAsyncThunk(
  "blog/allBlogs",
  async (param, thunkAPI) => {
    try {
      const response = await getAllBlog();
      return response;
    } catch (err) {
      throw err;
    }
  }
);

export const findBlogById = createAsyncThunk(
  "blog/blogById",
  async (params, thunkAPI) => {
    const response = await getBlogById(params);
    console.log(response)
    return response;
  }
);

export const editBlog= createAsyncThunk(
  "blog/editABlog",
  async (param, thunkAPI) => {
    const response = await editABlog(param);
    return response;
  }
);

export const postBlog = createAsyncThunk(
  "blog/postABlog",
  async (params, thunkAPI) => {
    const response = await postABlog(params);
    return response;
  }
);
const blogSlice = createSlice({
  name: "blog",
  initialState: initialState,
  reducers: {},
  extraReducers: {
    [allBlogs.fulfilled]: (state, action) => {
      state.isLoading = false;
      state.blog = action.payload;
    },
    [allBlogs.rejected]: (state, action) => {
      state.isLoading = false;
      state.error = action.payload;
    },
    [editBlog.fulfilled]: (state, action) => {
      state.isLoading = false;
      state.blog = action.payload;
    },
    [editBlog.rejected]: (state, action) => {
      state.isLoading = false;
      state.error = action.payload;
    },
    [postBlog.fulfilled]: (state, action) => {
      state.isLoading = false;
      state.blog = action.payload;
    },
    [postBlog.rejected]: (state, action) => {
      state.isLoading = false;
      state.error = action.payload;
    },
    [findBlogById.fulfilled]: (state, action) => {
      state.isLoading = false;
      state.blog = action.payload;
    },
    [findBlogById.rejected]: (state, action) => {
      state.isLoading = false;
      state.error = action.payload;
    },
  },
});

export const blogReducer = blogSlice.reducer;
