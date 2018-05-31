// @ts-check
import React, { Component } from "react";
import Grid from "@material-ui/core/Grid";
import Coin from "../Coin/Coin";
import idb from "idb";
import LinearProgress from "@material-ui/core/LinearProgress";
import CircularProgress from "@material-ui/core/CircularProgress";
const dbPromise = idb.open("CrypTrace", 3, upgradeDB => {
  upgradeDB.createObjectStore("CoinsList");
});
class CoinList extends Component {
  state = {
    loading: true,
    coins: []
  };

  getCoinList = () => {
    fetch("https://min-api.cryptocompare.com/data/all/coinlist")
      .then(reponse => reponse.json())
      .then(response =>
        Object.keys(response.Data).map(key => response.Data[key])
      )
      .then(data =>
        data.sort((a, b) => {
          return parseInt(a.SortOrder, 10) - parseInt(b.SortOrder, 10);
        })
      )
      .then(data =>
        data.map(coin => {
          return {
            Id: coin.Id,
            ImageUrl: coin.ImageUrl,
            CoinName: coin.CoinName,
            Symbol: coin.Symbol,
            SortOrder: parseInt(coin.SortOrder, 10),
            checked: false
          };
        })
      )
      .then(data => {
        dbPromise.then(db => {
          let tx = db.transaction("CoinsList", "readwrite");
          data.forEach(coin => {
            tx
              .objectStore("CoinsList")
              .put(JSON.stringify(coin), coin.SortOrder);
          });
          return tx.complete;
        });
        this.setState({ coins: data.slice(0, 12), loading: false });
      })
      .catch(err => console.log(err));
  };

  getMyCoinsFromIdb = () => {
    let myCoins = [];
    return dbPromise.then(db => {
      const tx = db.transaction("CoinsList");
      tx
        .objectStore("CoinsList")
        .getAll()
        .then(coins => {
          // console.log("fsdsd", keys);
          coins.forEach(c => {
            c = JSON.parse(c);
            if (c.checked) myCoins.push(c);
          });
        });
      return tx.complete.then(() => myCoins);
    });
  };

  componentDidMount() {
    this.getMyCoinsFromIdb().then(coins => {
      if (coins.length <= 0) {
        this.getCoinList();
      } else {
        this.setState({ coins: coins, loading: false });
      }
    });
  }

  render() {
    return (
      <div style={{ flexGrow: 1 }}>
        {this.state.loading ? (
          <div style={{ textAlign: "center", marginBottom: "10px" }}>
            <CircularProgress color="primary" />
          </div>
        ) : (
          <Grid container spacing={24}>
            {this.state.coins.map(e => {
              return (
                <Grid item xs={12} sm={4} key={e.SortOrder}>
                  <Coin data={e} />
                </Grid>
              );
            })}
          </Grid>
        )}
      </div>
    );
  }
}
export default CoinList;
