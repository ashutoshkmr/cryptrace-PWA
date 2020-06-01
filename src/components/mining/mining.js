import Grid from "@material-ui/core/Grid";
import React, { Component } from "react";
import { BulletList } from "react-content-loader";
import { connect } from "react-redux";
import { ShowError } from "../error/error";
import { MiningCard } from "./miningCard";
import { fetchMiningList } from "../../store/reducers/mining";

class Mining extends Component {
  componentDidMount() {
    this.props.fetchMiningList();
  }

  render() {
    return (
      <div className="container">
        {this.props.mining.loading ? (
          <BulletList />
        ) : !this.props.mining.hasError ? (
          <Grid container spacing={3}>
            {this.props.mining.list.map((e) => (
              <Grid key={e.Id} item xs={12} sm={6} md={4}>
                <MiningCard item={e} />
              </Grid>
            ))}
          </Grid>
        ) : (
          <ShowError errorMessage={this.props.mining.errorMsg} />
        )}
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    mining: state.entities.mining,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    fetchMiningList: () => dispatch(fetchMiningList()),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Mining);
