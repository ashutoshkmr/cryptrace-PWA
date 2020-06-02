import { createSlice } from "@reduxjs/toolkit";
import { apiCallBegan } from "../apiActions";
import moment from "moment";

const slice = createSlice({
  name: "chartData",
  initialState: {
    data: {
      labels: [],
      prices: [],
    },
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
      const dataPoints = action.payload["Data"].Data;
      const labels = dataPoints.map((p) =>
        moment(p.time * 1000).format("h:mm a")
      );
      const prices = dataPoints.map((p) => p.high);
      chartData.data.labels = labels;
      chartData.data.prices = prices;
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
      limit: 100,
    },
    onStart: chartDataRequested.type,
    onSuccess: chartDataReceived.type,
    onError: chartRequestFailed.type,
  });
};
