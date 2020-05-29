import { combineReducers } from "redux";
import allCoinsReducer from "./reducers/allCoins";
import chartDataReducer from "./reducers/chart";
import currentCoinReducer from "./reducers/coin";
import exchangesReducer from "./reducers/exchanges";
import favouritesReducer from "./reducers/favourites";
import miningReducer from "./reducers/mining";
import newsReducer from "./reducers/news";
import topCoinsReducer from "./reducers/topCoins";
import WalletReducer from "./reducers/wallets";

export default combineReducers({
  allCoins: allCoinsReducer,
  topCoins: topCoinsReducer,
  currentCoin: currentCoinReducer,
  chartData: chartDataReducer,
  news: newsReducer,
  mining: miningReducer,
  wallets: WalletReducer,
  exchanges: exchangesReducer,
  favourites: favouritesReducer,
});
