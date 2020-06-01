import { createSlice } from "@reduxjs/toolkit";
import { apiCallBegan } from "../apiActions";

const slice = createSlice({
  name: "chartData",
  initialState: {
    data: {},
    coinSymbol: null,
    loading: true,
    hasError: false,
  },
  reducers: {
    chartDataRequested: (chartData, action) => {
      chartData.loading = true;
      chartData.coinSymbol = action.payload.params.fsym;
    },

    chartDataReceived: (chartData, action) => {
      chartData.data[chartData.coinSymbol] = action.payload["Data"];
      // {
      // Data:[
      //{
      // close: 9156.6
      // conversionSymbol: ""
      // conversionType: "direct"
      // high: 9156.87
      // low: 9155.63
      // open: 9155.68
      // time: 1590584940
      // volumefrom: 4.783
      // volumeto: 43793.18
      //}
      // ],
      // TimeFrom: 1590584940
      // TimeTo: 1590671340
      // }
      chartData.loading = false;
      chartData.hasError = false;
    },

    chartRequestFailed: (chartData, action) => {
      chartData.loading = false;
      chartData.hasError = true;
    },
  },
});

export const {
  chartDataRequested,
  chartDataReceived,
  chartRequestFailed,
} = slice.actions;

export default slice.reducer;

export const fetchChartData = (coinSymbol) => {
  const url = "data/v2/histominute";
  // @ts-ignore
  return apiCallBegan({
    url,
    params: {
      fsym: coinSymbol,
      tsym: "USD",
    },
    onStart: chartDataRequested.type,
    onSuccess: chartDataReceived.type,
    onError: chartRequestFailed.type,
  });
};
