// @ts-check
import React, { Component } from "react";
import "./App.css";
import { Route, Switch } from "react-router-dom";
import Navigation from "./components/Navigation/Navigation";
import CoinList from "./components/CoinList/CoinList";
import CoinDrawer from "./components/CoinDrawer/CoinDrawer";
import CoinDetail from "./components/CoinDetail/CoinDetail";
class App extends Component {
  render() {
    return (
      <div className="App">
        <Navigation />
        <Switch>
          <Route path="/coin_detail" component={CoinDetail} />
          <Route path="/add_coin" component={CoinDrawer} />
          <Route path="/"  component={CoinList} />
        </Switch>
      </div>
    );
  }
}

export default App;
