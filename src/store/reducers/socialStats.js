// @ts-nocheck
import { createSlice } from "@reduxjs/toolkit";
import { apiCallBegan } from "../apiActions";

const slice = createSlice({
  name: "socialStats",
  initialState: {
    stats: {},
    loading: true,
    hasError: false,
    coinId: null,
    errorMsg: "",
  },
  reducers: {
    statsRequested: (news, action) => {
      news.loading = true;
      news.hasError = false;
    },

    statsReceived: (news, action) => {
      news.newsList = action.payload.Data;
      news.loading = false;
      news.hasError = false;
    },

    statsRequestFailed: (news, action) => {
      news.loading = false;
      news.hasError = true;
      news.errorMsg = action.payload;
    },
  },
});

export const {
  statsRequested,
  statsReceived,
  statsRequestFailed,
} = slice.actions;

export default slice.reducer;

export const fetchSocialStats = (coinId) => {
  const url = "/data/social/coin/latest";
  const apiKeyRequired = false;
  coinId = parseInt(coinId, 10);
  return apiCallBegan({
    url,
    apiKeyRequired,
    params: {
      coinId,
    },
    onStart: statsRequested.type,
    onSuccess: statsReceived.type,
    onError: statsRequestFailed.type,
  });
};
