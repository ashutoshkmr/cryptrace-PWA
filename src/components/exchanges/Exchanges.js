import Grid from "@material-ui/core/Grid";
import React, { Component } from "react";
import { BulletList } from "react-content-loader";
import { connect } from "react-redux";
import { fetchExchangesList } from "../../store/reducers/exchanges";
import { ShowError } from "../error/error";
import "./Exchange.css";
import { ExchangeCard } from "./ExchangeCard";

class Exchanges extends Component {
  componentDidMount() {
    this.props.fetchExchangesList();
  }

  render() {
    return (
      <div className="container">
        {this.props.exchanges.loading ? (
          <BulletList />
        ) : !this.props.exchanges.hasError ? (
          <Grid container spacing={3}>
            {this.props.exchanges.list.map((e) => (
              <Grid key={e.Id} item xs={12} sm={6} md={4}>
                <ExchangeCard item={e} />
              </Grid>
            ))}
          </Grid>
        ) : (
          <ShowError errorMessage={this.props.exchanges.errorMsg} />
        )}
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    exchanges: state.entities.exchanges,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    fetchExchangesList: () => dispatch(fetchExchangesList()),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Exchanges);
