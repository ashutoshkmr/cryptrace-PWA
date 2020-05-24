import { combineReducers } from "redux";
import topCoinsReducer from "./topCoins";
import favouritesReducer from "./favourites";

export default combineReducers({
  topCoins: topCoinsReducer,
  favourites: favouritesReducer,
});
