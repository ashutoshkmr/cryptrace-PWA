import { createSlice } from "@reduxjs/toolkit";
import { apiCallBegan } from "../apiActions";
import idbService from "../../services/idbService";

const slice = createSlice({
  name: "favourites",
  initialState: {
    coins: [],
    loading: false,
  },
  reducers: {
    favouritesRequested: (favourites, action) => {
      favourites.loading = true;
    },

    favouritesReceived: (favourites, action) => {
      favourites.coins = action.payload;
      favourites.loading = false;
    },

    favouritesRequestFailed: (favourites, action) => {
      favourites.loading = false;
    },

    addToFavouritesRequestFailed: (favourites, action) => {
      favourites.coins.push(action.payload.coin);
    },

    removeFromFavouritesRequestFailed: (favourites, action) => {
      // const idx = favourites.coins.findIndex();
    },
  },
});

export const {
  favouritesReceived,
  favouritesRequested,
  favouritesRequestFailed,
} = slice.actions;

export default slice.reducer;

export const loadfavourites = () =>
  // @ts-ignore
  apiCallBegan({
    onStart: favouritesRequested.type,
    onSuccess: favouritesReceived.type,
    onError: favouritesRequestFailed.type,
  });
