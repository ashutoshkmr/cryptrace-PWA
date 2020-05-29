// @ts-nocheck
import { createSlice } from "@reduxjs/toolkit";
import { apiCallBegan } from "../apiActions";

const slice = createSlice({
  name: "allCoins",
  initialState: {
    coinList: {},
    sortOrder: [],
    loading: true,
    hasError: false,
    errorMsg: "",
  },
  reducers: {
    coinsListRequested: (coinList, action) => {
      coinList.loading = true;
      coinList.hasError = false;
    },

    coinsListReceived: (coinList, action) => {
      coinList.coins = action.payload.Data.map((e) => ({
        coinInfo: e.CoinInfo,
        display: e.DISPLAY.USD,
      }));
      coinList.loading = false;
      coinList.hasError = false;
    },

    coinsListRequestFailed: (coinList, action) => {
      coinList.loading = false;
      coinList.hasError = true;
      coinList.errorMsg = action.payload;
    },
  },
});

export const {
  coinsListRequested,
  coinsListReceived,
  coinsListRequestFailed,
} = slice.actions;

export default slice.reducer;

export const loadcoinsList = () => {
  const url = "/data/all/coinlist";
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
