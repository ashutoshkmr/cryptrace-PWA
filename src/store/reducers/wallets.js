// @ts-nocheck
import { createSlice } from "@reduxjs/toolkit";
import { apiCallBegan } from "../apiActions";

const slice = createSlice({
  name: "wallets",
  initialState: {
    wallets: [],
    loading: true,
    hasError: false,
    errorMsg: "",
  },
  reducers: {
    walletListRequested: (wallets, action) => {
      wallets.loading = true;
      wallets.hasError = false;
    },

    walletListReceived: (wallets, action) => {
      wallets.coins = action.payload.Data.map((e) => ({
        coinInfo: e.CoinInfo,
        display: e.DISPLAY.USD,
      }));
      wallets.loading = false;
      wallets.hasError = false;
    },

    walletListRequestFailed: (wallets, action) => {
      wallets.loading = false;
      wallets.hasError = true;
      wallets.errorMsg = action.payload;
    },
  },
});

export const {
  walletListRequested,
  walletListReceived,
  walletListRequestFailed,
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
    onStart: walletListRequested.type,
    onSuccess: walletListReceived.type,
    onError: walletListRequestFailed.type,
  });
};
