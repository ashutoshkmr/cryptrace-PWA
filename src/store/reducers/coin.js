import { createSlice } from "@reduxjs/toolkit";
import { apiCallBegan } from "../apiActions";

const slice = createSlice({
  name: "currentCoin",
  initialState: {
    coin: {},
    chartData: [],
    coinSymbol: null,
    loadingcoinData: true,
    loadingChartData: true,
    hasError: false,
  },
  reducers: {
    coinRequested: (currentCoin, action) => {
      currentCoin.loadingcoinData = true;
      currentCoin.coinSymbol = action.payload.params.fsyms;
    },

    coinReceived: (currentCoin, action) => {
      currentCoin.coin = action.payload.DISPLAY[currentCoin.coinSymbol]["USD"];
      currentCoin.loadingcoinData = false;
      currentCoin.hasError = false;
    },

    coinRequestFailed: (currentCoin, action) => {
      currentCoin.loadingcoinData = false;
      currentCoin.hasError = true;
    },
  },
});

export const { coinRequested, coinReceived, coinRequestFailed } = slice.actions;

export default slice.reducer;

export const fetchCurrentCoin = (coinSymbol) => {
  const url = "data/pricemultifull";
  // @ts-ignore
  return apiCallBegan({
    url,
    params: {
      fsyms: coinSymbol,
      tsyms: "USD",
    },
    onStart: coinRequested.type,
    onSuccess: coinReceived.type,
    onError: coinRequestFailed.type,
  });
};
