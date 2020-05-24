// @ts-check
import CircularProgress from "@material-ui/core/CircularProgress";
import Grid from "@material-ui/core/Grid";
import React, { Component } from "react";
import Coin from "../Coin/Coin";
import { connect } from "react-redux";
import { loadcoinsList } from "../../store/coins";

class CoinList extends Component {
  componentDidMount() {
    this.props.loadcoinsList();
  }
  render() {
    console.log(this.props);
    return (
      <div style={{ flexGrow: 1 }}>
        hello world
        {/* {this.state.loading ? (
          <div style={{ textAlign: "center", marginBottom: "10px" }}>
            <CircularProgress color="primary" />
          </div>
        ) : (
          <Grid container spacing={8}>
            {this.state.coins.map((e) => {
              return (
                <Grid item xs={12} sm={4} key={e.SortOrder}>
                  <Coin data={e} />
                </Grid>
              );
            })}
          </Grid>
        )} */}
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    coinsList: state.coinsList,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    loadcoinsList: () => dispatch(loadcoinsList()),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(CoinList);
