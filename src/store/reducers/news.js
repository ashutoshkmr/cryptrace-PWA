// @ts-nocheck
import { createSlice } from "@reduxjs/toolkit";
import { apiCallBegan } from "../apiActions";

const slice = createSlice({
  name: "news",
  initialState: {
    newsList: [],
    loading: true,
    hasError: false,
    errorMsg: "",
  },
  reducers: {
    newsListRequested: (news, action) => {
      news.loading = true;
      news.hasError = false;
    },

    newsListReceived: (news, action) => {
      news.newsList = action.payload.Data;
      news.loading = false;
      news.hasError = false;
    },

    newsListRequestFailed: (news, action) => {
      news.loading = false;
      news.hasError = true;
      news.errorMsg = action.payload;
    },
  },
});

export const {
  newsListRequested,
  newsListReceived,
  newsListRequestFailed,
} = slice.actions;

export default slice.reducer;

export const fetchNewsList = () => {
  const url = "/data/v2/news/";
  const apiKeyRequired = false;
  return apiCallBegan({
    url,
    apiKeyRequired,
    params: {
      lang: "EN",
    },
    onStart: newsListRequested.type,
    onSuccess: newsListReceived.type,
    onError: newsListRequestFailed.type,
  });
};
