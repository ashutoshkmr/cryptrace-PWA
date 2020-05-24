import { combineReducers } from "redux";
import coinsReducer from "./coins";
import favouritesReducer from "./favourites";

export default combineReducers({
  coinsList: coinsReducer,
  favourites: favouritesReducer,
});
