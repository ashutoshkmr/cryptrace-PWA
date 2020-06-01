// @ts-nocheck
import { createSlice } from "@reduxjs/toolkit";
import { apiCallBegan } from "../apiActions";

const slice = createSlice({
  name: "allCoins",
  initialState: {
    list: {},
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
      let list = Object.values(action.payload.Data);
      list = list.sort(
        (a, b) => parseInt(a.SortOrder, 10) - parseInt(b.SortOrder, 10)
      );
      coinList.list = list;
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

export const fetchCoinList = () => {
  const url = "/data/all/coinlist";
  const apiKeyRequired = true;
  return apiCallBegan({
    url,
    apiKeyRequired,
    params: {
      limit: 100,
      tsym: "USD",
    },
    onStart: coinsListRequested.type,
    onSuccess: coinsListReceived.type,
    onError: coinsListRequestFailed.type,
  });
};
