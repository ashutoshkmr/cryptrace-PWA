import Grid from "@material-ui/core/Grid";
import React, { Component } from "react";
import { BulletList } from "react-content-loader";
import { connect } from "react-redux";
import { fetchWalletList } from "../../store/reducers/wallets";
import { ShowError } from "../error/error";
import { WalletCard } from "./walletCard";

class Walltes extends Component {
  componentDidMount() {
    this.props.fetchWalletList();
  }

  render() {
    return (
      <div className="container">
        {this.props.wallets.loading ? (
          <BulletList />
        ) : !this.props.wallets.hasError ? (
          <Grid container spacing={3}>
            {this.props.wallets.list.map((e) => (
              <Grid key={e.Id} item xs={12} sm={6} md={4}>
                <WalletCard item={e} />
              </Grid>
            ))}
          </Grid>
        ) : (
          <ShowError errorMessage={this.props.wallets.errorMsg} />
        )}
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    wallets: state.entities.wallets,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    fetchWalletList: () => dispatch(fetchWalletList()),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Walltes);
