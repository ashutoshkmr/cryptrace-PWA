import { configureStore, getDefaultMiddleware } from "@reduxjs/toolkit";
import api from "./middleware/api";
import reducer from "./reducer";

export default () => {
  return configureStore({
    reducer: reducer,
    middleware: [...getDefaultMiddleware(), api],
  });
};
