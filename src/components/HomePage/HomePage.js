// @ts-check
import {
  Avatar,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableRow,
  Tooltip,
  TableHead,
} from "@material-ui/core";
import CircularProgress from "@material-ui/core/CircularProgress";
import React, { Component, Fragment } from "react";
import { connect } from "react-redux";
import { loadcoinsList } from "../../store/topCoins";
import { BulletList } from "react-content-loader";

class HomePage extends Component {
  componentDidMount() {
    this.props.loadcoinsList();
  }

  navigatetoCoinsDetailPage = (coin, coinId) => {
    this.props.history.push(`/${coinId}`, { coin });
  };

  render() {
    return (
      <Fragment>
        <div>Display Favourite here</div>
        <div className="topCoinList"></div>
        {this.props.topCoins.loading ? (
          <BulletList />
        ) : (
          <TableContainer component={Paper}>
            <Table stickyHeader aria-label="simple table">
              <TableHead>
                <TableRow>
                  {[
                    "",
                    "Name",
                    "Price",
                    "Change(24 Hr)",
                    "% Change",
                    "Market Cap.",
                  ].map((column) => (
                    <TableCell key={column} align="left">
                      {column}
                    </TableCell>
                  ))}
                </TableRow>
              </TableHead>
              <TableBody>
                {this.props.topCoins.coins.map((row) => {
                  const coinInfo = row.coinInfo;
                  const priceInfo = row.display;
                  return (
                    <TableRow
                      hover
                      key={coinInfo.Name}
                      onClick={(event) =>
                        this.navigatetoCoinsDetailPage(row, coinInfo.Id)
                      }
                    >
                      <TableCell component="th" scope="row">
                        <Avatar
                          src={`https://cryptocompare.com${coinInfo.ImageUrl}`}
                          aria-label={coinInfo.Name}
                        />
                      </TableCell>
                      <TableCell>
                        {`${coinInfo.FullName} (${coinInfo.Name})`}
                      </TableCell>
                      <TableCell>{priceInfo.PRICE}</TableCell>
                      <TableCell>
                        <Tooltip title="Change in 24 hour" arrow>
                          <Fragment>{priceInfo.CHANGE24HOUR}</Fragment>
                        </Tooltip>
                      </TableCell>
                      <TableCell>
                        <Tooltip title="Percentage Change in 24 hour" arrow>
                          <Fragment>{priceInfo.CHANGEPCT24HOUR}</Fragment>
                        </Tooltip>
                      </TableCell>
                      <TableCell>
                        <Tooltip title="Market Cap." arrow>
                          <Fragment>{priceInfo.MKTCAP}</Fragment>
                        </Tooltip>
                      </TableCell>
                    </TableRow>
                  );
                })}
              </TableBody>
            </Table>
          </TableContainer>
        )}
      </Fragment>
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

export default connect(mapStateToProps, mapDispatchToProps)(HomePage);
