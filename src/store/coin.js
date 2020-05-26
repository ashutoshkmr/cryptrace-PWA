import { createSlice } from "@reduxjs/toolkit";
import { apiCallBegan } from "./apiActions";

const slice = createSlice({
  name: "currentCoin",
  initialState: {
    coin: {},
    coinSymbol: null,
    loading: true,
    hasError: false,
  },
  reducers: {
    coinRequested: (currentCoin, action) => {
      currentCoin.loading = true;
      currentCoin.coinSymbol = action.payload.coinSymbol;
    },

    coinReceived: (currentCoin, action) => {
      currentCoin.coin = action.payload.DISPLAY[currentCoin.coinSymbol]["USD"];
      currentCoin.loading = false;
      currentCoin.hasError = false;
    },

    coinRequestFailed: (currentCoin, action) => {
      currentCoin.loading = false;
      currentCoin.hasError = true;
    },
  },
});

export const { coinRequested, coinReceived, coinRequestFailed } = slice.actions;

export default slice.reducer;

export const loadCurrentCoin = (coinSymbol) => {
  const url = "data/pricemultifull";
  // @ts-ignore
  return apiCallBegan({
    url,
    coinSymbol,
    params: {
      fsyms: coinSymbol,
      tsyms: "USD",
    },
    onStart: coinRequested.type,
    onSuccess: coinReceived.type,
    onError: coinRequestFailed.type,
  });
};
