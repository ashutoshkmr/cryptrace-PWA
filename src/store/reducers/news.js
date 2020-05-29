// @ts-nocheck
import { createSlice } from "@reduxjs/toolkit";
import { apiCallBegan } from "../apiActions";

const slice = createSlice({
  name: "news",
  initialState: {
    news: [],
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
      news.coins = action.payload.Data.map((e) => ({
        coinInfo: e.CoinInfo,
        display: e.DISPLAY.USD,
      }));
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

export const loadcoinsList = () => {
  const url = "/data/v2/news/";
  return apiCallBegan({
    url,
    params: {
      lang: "EN",
    },
    onStart: newsListRequested.type,
    onSuccess: newsListReceived.type,
    onError: newsListRequestFailed.type,
  });
};
