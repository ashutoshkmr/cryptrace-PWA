import { combineReducers } from "redux";
import topCoinsReducer from "./topCoins";
import favouritesReducer from "./favourites";
import currentCoinReducer from "./coin";

export default combineReducers({
  topCoins: topCoinsReducer,
  favourites: favouritesReducer,
  currentCoin: currentCoinReducer,
});
