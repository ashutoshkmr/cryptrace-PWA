// @ts-nocheck
import { createSlice } from "@reduxjs/toolkit";
import { apiCallBegan } from "../apiActions";

const slice = createSlice({
  name: "wallets",
  initialState: {
    list: [],
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
      wallets.list = Object.values(action.payload.Data);
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

export const fetchWalletList = () => {
  const url = "/data/wallets/general";
  const apiKeyRequired = true;
  return apiCallBegan({
    url,
    apiKeyRequired,
    params: {},
    onStart: walletListRequested.type,
    onSuccess: walletListReceived.type,
    onError: walletListRequestFailed.type,
  });
};
