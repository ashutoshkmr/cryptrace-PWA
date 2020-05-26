// @ts-nocheck
import { createSlice } from "@reduxjs/toolkit";
import { apiCallBegan } from "./apiActions";

const slice = createSlice({
  name: "topCoins",
  initialState: {
    coins: [],
    sortOrder: [],
    loading: true,
    hasError: false,
  },
  reducers: {
    coinsListRequested: (topCoins, action) => {
      topCoins.loading = true;
    },

    coinsListReceived: (topCoins, action) => {
      topCoins.coins = action.payload.Data.map((e) => ({
        coinInfo: e.CoinInfo,
        display: e.DISPLAY.USD,
      }));
      topCoins.loading = false;
      topCoins.hasError = false;
    },

    coinsListRequestFailed: (topCoins, action) => {
      topCoins.loading = false;
      topCoins.hasError = true;
    },
  },
});

export const {
  coinsListReceived,
  coinsListRequested,
  coinsListRequestFailed,
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
    onStart: coinsListRequested.type,
    onSuccess: coinsListReceived.type,
    onError: coinsListRequestFailed.type,
  });
};
