// @ts-nocheck
import { createSlice } from "@reduxjs/toolkit";
import { apiCallBegan } from "../apiActions";

const slice = createSlice({
  name: "mining",
  initialState: {
    mining: [],
    loading: true,
    hasError: false,
    errorMsg: "",
  },
  reducers: {
    miningListRequested: (mining, action) => {
      mining.loading = true;
      mining.hasError = false;
    },

    miningListReceived: (mining, action) => {
      mining.coins = action.payload.Data.map((e) => ({
        coinInfo: e.CoinInfo,
        display: e.DISPLAY.USD,
      }));
      mining.loading = false;
      mining.hasError = false;
    },

    miningListRequestFailed: (mining, action) => {
      mining.loading = false;
      mining.hasError = true;
      mining.errorMsg = action.payload;
    },
  },
});

export const {
  miningListRequested,
  miningListReceived,
  miningListRequestFailed,
} = slice.actions;

export default slice.reducer;

export const loadcoinsList = () => {
  const url = "/data/top/totalvolfull";
  return apiCallBegan({
    url,
    params: {
      limit: 100,
      tsym: "USD",
    },
    onStart: miningListRequested.type,
    onSuccess: miningListReceived.type,
    onError: miningListRequestFailed.type,
  });
};
