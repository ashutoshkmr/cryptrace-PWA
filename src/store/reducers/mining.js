// @ts-nocheck
import { createSlice } from "@reduxjs/toolkit";
import { apiCallBegan } from "../apiActions";

const slice = createSlice({
  name: "mining",
  initialState: {
    list: [],
    loading: true,
    hasError: false,
    errorMsg: "",
  },
  reducers: {
    miningListRequested: (mining, action) => {
      mining.loading = true;
      mining.hasError = false;
    },

    miningListReceived: (mining, action) => {
      mining.list = Object.values(action.payload.Data);
      mining.loading = false;
      mining.hasError = false;
    },

    miningListRequestFailed: (mining, action) => {
      mining.loading = false;
      mining.hasError = true;
      mining.errorMsg = action.payload;
    },
  },
});

export const {
  miningListRequested,
  miningListReceived,
  miningListRequestFailed,
} = slice.actions;

export default slice.reducer;

export const fetchMiningList = () => {
  const url = "/data/mining/pools/general";
  const apiKeyRequired = true;
  return apiCallBegan({
    url,
    apiKeyRequired,
    params: {},
    onStart: miningListRequested.type,
    onSuccess: miningListReceived.type,
    onError: miningListRequestFailed.type,
  });
};
