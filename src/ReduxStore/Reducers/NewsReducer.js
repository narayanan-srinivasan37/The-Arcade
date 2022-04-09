import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { getNews } from "../../API_CALLS/News";

const initialState = {
  isLoading: true,
  news: [],
  error: null,
};

export const getallNews = createAsyncThunk(
  "news/allNews",
  async (param, thunkAPI) => {
    try {
     
      const response = await getNews();

      return response;
    } catch (err) {
      throw err;
    }
  }
);

const newsSlice = createSlice({
  name: "news",
  initialState: initialState,
  reducers: {},
  extraReducers: {
    [getallNews.fulfilled]: (state, action) => {
      state.news = action.payload;
      state.isLoading = false;
    },
    [getallNews.rejected]: (state, action) => {
      state.error = action.payload;
      state.isLoading = false;
    },
  },
});

export const newsReducer = newsSlice.reducer;
