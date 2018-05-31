// @ts-check
import React, { Component } from "react";
import {
  List,
  ListItem,
  ListItemText,
  Checkbox,
  Button
} from "@material-ui/core";
import AddIcon from "@material-ui/icons/Add";
import idb from "idb";
const dbPromise = idb.open("CrypTrace", 3, upgradeDB => {
  upgradeDB.createObjectStore("CoinsList");
});

class CoinDrawer extends Component {
  state = {
    loading: true,
    data: [],
    coinLimit: 8
  };
  addCoins = () => {
    this.setState({ coinLimit: this.state.coinLimit + 10 });
  };
  toggleCoin = e => {
    e.checked = !e.checked;
    let index = this.state.data.indexOf(e),
      tempData = this.state.data;
    tempData[index] = e;
    this.setState({ data: tempData });
    dbPromise.then(db => {
      let tx = db.transaction("CoinsList", "readwrite");
      tx.objectStore("CoinsList").put(JSON.stringify(e), e.SortOrder);
      return tx.complete;
    });
  };
  fetchCoins = () => {
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
        this.setState({ data: data, loading: false });
      })
      .catch(err => console.log(err));
  };

  componentDidMount() {
    dbPromise.then(db => {
      let tx = db.transaction("CoinsList");
      tx
        .objectStore("CoinsList")
        .getAll()
        .then(data => {
          if (data.length <= 0) {
            this.fetchCoins();
          } else {
            data = data.map(e => JSON.parse(e));
            this.setState({ data: data, loading: false });
          }
        });
    });
  }

  render() {
    let coinlist = this.state.data.slice(0, this.state.coinLimit) || null;
    return (
      <div className="">
        {this.state.loading ? "" : null}
        <List>
          {/* <Subheader>Select coins</Subheader> */}
          {coinlist
            ? coinlist.map(e => {
                return (
                  <ListItem
                    className="animated zoomIn"
                    style={{ animationDuration: "500ms" }}
                    key={e.Id}
                  >
                    <Checkbox
                      color="primary"
                      checked={e.checked}
                      onClick={() => this.toggleCoin(e)}
                    />
                    <ListItemText
                      onClick={() => this.toggleCoin(e)}
                      primary={e.CoinName + " (" + e.Symbol + ")"}
                    />
                  </ListItem>
                );
              })
            : null}
          <div style={{ textAlign: "center" }}>
            <Button
              onClick={this.addCoins}
              variant="raised"
              component="span"
              color="primary"
              aria-label="add"
            >
              <AddIcon />
            </Button>
          </div>
        </List>
      </div>
    );
  }
}

export default CoinDrawer;
