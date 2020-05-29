// @ts-nocheck
import { createSlice } from "@reduxjs/toolkit";
import { apiCallBegan } from "../apiActions";

const slice = createSlice({
  name: "exchanges",
  initialState: {
    exchanges: [],
    loading: true,
    hasError: false,
    errorMsg: "",
  },
  reducers: {
    exchangeListRequested: (exchanges, action) => {
      exchanges.loading = true;
      exchanges.hasError = false;
    },

    exchangeListReceived: (exchanges, action) => {
      exchanges.coins = action.payload.Data.map((e) => ({
        coinInfo: e.CoinInfo,
        display: e.DISPLAY.USD,
      }));
      exchanges.loading = false;
      exchanges.hasError = false;
    },

    exchangeListRequestFailed: (exchanges, action) => {
      exchanges.loading = false;
      exchanges.hasError = true;
      exchanges.errorMsg = action.payload;
    },
  },
});

export const {
  exchangeListRequested,
  exchangeListReceived,
  exchangeListRequestFailed,
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
    onStart: exchangeListRequested.type,
    onSuccess: exchangeListReceived.type,
    onError: exchangeListRequestFailed.type,
  });
};
