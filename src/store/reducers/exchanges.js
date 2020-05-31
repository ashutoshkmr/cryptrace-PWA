// @ts-nocheck
import { createSlice } from "@reduxjs/toolkit";
import { apiCallBegan } from "../apiActions";

const slice = createSlice({
  name: "exchanges",
  initialState: {
    list: [],
    loading: true,
    hasError: false,
    errorMsg: "",
  },
  reducers: {
    exchangeListRequested: (exchanges, action) => {
      exchanges.loading = true;
      exchanges.hasError = false;
    },

    exchangeListReceived: (exchanges, action) => {
      exchanges.list = Object.values(action.payload.Data);
      exchanges.loading = false;
      exchanges.hasError = false;
    },

    exchangeListRequestFailed: (exchanges, action) => {
      exchanges.loading = false;
      exchanges.hasError = true;
      exchanges.errorMsg = action.payload;
    },
  },
});

export const {
  exchangeListRequested,
  exchangeListReceived,
  exchangeListRequestFailed,
} = slice.actions;

export default slice.reducer;

export const fetchExchangesList = () => {
  const url = "/data/exchanges/general";
  return apiCallBegan({
    url,
    params: {},
    onStart: exchangeListRequested.type,
    onSuccess: exchangeListReceived.type,
    onError: exchangeListRequestFailed.type,
  });
};
