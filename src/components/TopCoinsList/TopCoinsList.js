// @ts-check
import CircularProgress from "@material-ui/core/CircularProgress";
import Grid from "@material-ui/core/Grid";
import React, { Component } from "react";
import Coin from "../Coin/Coin";
import { connect } from "react-redux";
import { loadcoinsList } from "../../store/topCoins";

class TopCoinsList extends Component {
  componentDidMount() {
    this.props.loadcoinsList();
  }
  render() {
    return (
      <div style={{ flexGrow: 1 }}>
        {this.props.loading ? (
          <div style={{ textAlign: "center", marginBottom: "10px" }}>
            <CircularProgress color="primary" />
          </div>
        ) : (
          <Grid container spacing={8}>
            {this.props.topCoins.coins.map((e) => {
              return (
                <Grid item xs={12} sm={4} key={e.coinInfo.Id}>
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

const mapStateToProps = (state) => {
  return {
    topCoins: state.entities.topCoins,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    loadcoinsList: () => dispatch(loadcoinsList()),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(TopCoinsList);
