// @ts-nocheck
import { createSlice } from "@reduxjs/toolkit";
import { apiCallBegan } from "../apiActions";

const slice = createSlice({
  name: "topCoins",
  initialState: {
    coinList: [],
    loading: true,
    hasError: false,
    errorMsg: "",
  },
  reducers: {
    topCoinsRequested: (topCoins, action) => {
      topCoins.loading = true;
      topCoins.hasError = false;
    },

    topCoinsReceived: (topCoins, action) => {
      topCoins.coinList = action.payload.Data.map((e) => ({
        coinInfo: e.CoinInfo,
        display: e.DISPLAY.USD,
      }));
      topCoins.loading = false;
      topCoins.hasError = false;
    },

    topCoinsRequestFailed: (topCoins, action) => {
      topCoins.loading = false;
      topCoins.hasError = true;
      topCoins.errorMsg = action.payload;
    },
  },
});

export const {
  topCoinsRequested,
  topCoinsReceived,
  topCoinsRequestFailed,
} = slice.actions;

export default slice.reducer;

export const fetchTopCoins = () => {
  const url = "/data/top/totalvolfull";
  return apiCallBegan({
    url,
    params: {
      limit: 100,
      tsym: "USD",
    },
    onStart: topCoinsRequested.type,
    onSuccess: topCoinsReceived.type,
    onError: topCoinsRequestFailed.type,
  });
};
