import { createSlice } from "@reduxjs/toolkit";
import { apiCallBegan } from "../apiActions";

const slice = createSlice({
  name: "chartData",
  initialState: {
    chartData: {},
    coinSymbol: null,
    loading: true,
    hasError: false,
  },
  reducers: {
    chartDataRequested: (currentCoin, action) => {
      currentCoin.loading = true;
      currentCoin.coinSymbol = action.payload.coinSymbol;
    },

    chartDataReceived: (currentCoin, action) => {
      currentCoin.chartData =
        action.payload.DISPLAY[currentCoin.coinSymbol]["Data"];
      currentCoin.loading = false;
      currentCoin.hasError = false;
    },

    chartRequestFailed: (currentCoin, action) => {
      currentCoin.loading = false;
      currentCoin.hasError = true;
    },
  },
});

export const { chartDataRequested, chartDataReceived, chartRequestFailed } = slice.actions;

export default slice.reducer;

export const fetchCurrentCoin = (coinSymbol) => {
  const url = "data/pricemultifull";
  // @ts-ignore
  return apiCallBegan({
    url,
    coinSymbol,
    params: {
      fsyms: coinSymbol,
      tsyms: "USD",
    },
    onStart: chartDataRequested.type,
    onSuccess: chartDataReceived.type,
    onError: chartRequestFailed.type,
  });
};

export const fetchChartData = (coinSymbol) => {
  const url = "data/v2/histominute";
  // @ts-ignore
  return apiCallBegan({
    url,
    coinSymbol,
    params: {
      fsyms: coinSymbol,
      tsyms: "USD",
    },
    onStart: chartDataRequested.type,
    onSuccess: chartDataReceived.type,
    onError: chartRequestFailed.type,
  });
};
