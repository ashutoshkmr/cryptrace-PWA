import Grid from "@material-ui/core/Grid";
import React, { Component, Fragment } from "react";
import { BulletList } from "react-content-loader";
import { connect } from "react-redux";
import { ShowError } from "../error/error";
import { MiningCard } from "./miningCard";
import { fetchMiningList } from "../../store/reducers/mining";
import { LinearProgress } from "@material-ui/core";

class Mining extends Component {
  componentDidMount() {
    this.props.fetchMiningList();
  }

  render() {
    return (
      <div>
        {this.props.mining.loading ? (
          <Fragment>
            <LinearProgress />
            <BulletList />
          </Fragment>
        ) : !this.props.mining.hasError ? (
          <div className="mining-container" style={{ paddingTop: "24px" }}>
            <Grid container spacing={3}>
              {this.props.mining.list.map((e) => (
                <Grid key={e.Id} item xs={12} sm={6} md={4}>
                  <MiningCard item={e} />
                </Grid>
              ))}
            </Grid>
          </div>
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
