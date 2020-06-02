import {
  Avatar,
  Box,
  LinearProgress,
  Link,
  Typography,
} from "@material-ui/core";
import Paper from "@material-ui/core/Paper";
import { Link as LinkIcon } from "@material-ui/icons";
import React, { Component, Fragment } from "react";
import { BulletList } from "react-content-loader";
import { connect } from "react-redux";
import { AutoSizer, List } from "react-virtualized";
import { fetchCoinList } from "../../store/reducers/allCoins";
import { ShowError } from "../error/error";

class AllCoinsList extends Component {
  componentDidMount() {
    this.props.fetchCoinList();
  }

  _rowRenderer = ({ index, isScrolling, key, style }) => {
    const coin = this.props.allCoins.list[index];
    return (
      <Paper
        key={key}
        elevation={3}
        variant="outlined"
        style={{ ...style, backgroundColor: "#fff" }}
      >
        <Box
          display="flex"
          justifyContent="space-between"
          alignItems="center"
          height="100%"
          padding="0 16px"
        >
          <Box flex="1">
            <Avatar src={`https://cryptocompare.com${coin.ImageUrl}`}></Avatar>
          </Box>
          <Box flex="1">
            <Typography variant="subtitle2">#{coin.SortOrder}</Typography>
          </Box>
          <Box flex="1">
            <Typography variant="subtitle2">{coin.FullName}</Typography>
          </Box>
          <Box flex="1">
            <Typography variant="subtitle2">{coin.Symbol}</Typography>
          </Box>
          <Box flex="1" textAlign="right">
            <Link
              href={`https://cryptocompare.com${coin.Url}`}
              target="_blank"
              rel="noreffer noopener"
            >
              <LinkIcon />
            </Link>
          </Box>
        </Box>
      </Paper>
    );
  };

  render() {
    return (
      <div style={{ height: "100%" }}>
        {this.props.allCoins.loading ? (
          <Fragment>
            <LinearProgress />
            <BulletList />
          </Fragment>
        ) : !this.props.allCoins.hasError ? (
          <Box pt={3} style={{ height: "100%" }}>
            <AutoSizer>
              {({ width, height }) => (
                <List
                  height={height}
                  rowCount={this.props.allCoins.list.length}
                  rowHeight={64}
                  rowRenderer={this._rowRenderer}
                  width={width}
                />
              )}
            </AutoSizer>
          </Box>
        ) : (
          <ShowError errorMessage={this.props.allCoins.errorMsg} />
        )}
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    allCoins: state.entities.allCoins,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    fetchCoinList: () => dispatch(fetchCoinList()),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(AllCoinsList);
