import { createSlice } from "@reduxjs/toolkit";
import { ApiConstants } from "../helpers/apiConstants";
import { apiCallBegan } from "./apiActions";

const slice = createSlice({
  name: "coinsList",
  initialState: {
    coins: {},
    sortOrder: [],
    loading: false,
  },
  reducers: {
    coinsListRequested: (coinsList, action) => {
      coinsList.loading = true;
    },

    coinsListReceived: (coinsList, action) => {
      coinsList.coins = action.payload.Data;
      const values = Object.values(action.payload.Data);
      values.sort(
        (a, b) => parseInt(a.SortOrder, 10) - parseInt(b.SortOrder, 10)
      );
      coinsList.sortOrder = values.map((c) => c.Symbol);
      coinsList.loading = false;
    },

    coinsListRequestFailed: (coinsList, action) => {
      coinsList.loading = false;
    },
  },
});

export const {
  coinsListReceived,
  coinsListRequested,
  coinsListRequestFailed,
} = slice.actions;

export default slice.reducer;

export const loadcoinsList = () => {
  const url = `${ApiConstants.baseUrl}/data/all/coinlist`;

  apiCallBegan({
    url,
    params: ApiConstants.params,
    onStart: coinsListRequested.type,
    onSuccess: coinsListReceived.type,
    onError: coinsListRequestFailed.type,
  });
};
