// @ts-check
import {
  Avatar,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Tooltip,
  Typography,
} from "@material-ui/core";
import React, { Component, Fragment } from "react";
import { BulletList } from "react-content-loader";
import { connect } from "react-redux";
import { fetchTopCoins } from "../../store/reducers/topCoins";
import { ShowError } from "../error/error";
import { Favourites } from "../favourites/Favourites";
import "./HomePage.css";
class HomePage extends Component {
  componentDidMount() {
    this.props.fetchTopCoins();
  }

  navigatetoCoinsDetailPage = (coinSymbol) => {
    this.props.history.push(`/${coinSymbol}`);
  };

  render() {
    return (
      <div className="homepage-container">
        {this.props.favourites && this.props.favourites.length > 0 ? (
          <div className="favourites-container">
            <Favourites></Favourites>
          </div>
        ) : (
          <Fragment />
        )}
        {this.props.topCoins.loading ? (
          <BulletList />
        ) : !this.props.topCoins.hasError ? (
          <TableContainer component={Paper}>
            <Table stickyHeader aria-label="Top Coins in 24hr">
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
                {this.props.topCoins.coinList.map((row) => {
                  const coinInfo = row.coinInfo;
                  const priceInfo = row.display;
                  return (
                    <TableRow
                      hover
                      key={coinInfo.Name}
                      onClick={(event) =>
                        this.navigatetoCoinsDetailPage(coinInfo.Name)
                      }
                    >
                      <TableCell component="th" scope="row">
                        <Avatar
                          src={`https://cryptocompare.com${coinInfo.ImageUrl}`}
                          aria-label={coinInfo.Name}
                        />
                      </TableCell>
                      <TableCell>
                        <Typography variant="subtitle1">
                          {`${coinInfo.FullName} (${coinInfo.Name})`}
                        </Typography>
                      </TableCell>
                      <TableCell>{priceInfo.PRICE}</TableCell>
                      <TableCell>
                        <Tooltip title="Change in 24 hour" arrow>
                          <Typography
                            variant="subtitle1"
                            color={
                              priceInfo.CHANGE24HOUR.startsWith("-")
                                ? "error"
                                : "initial"
                            }
                          >
                            {priceInfo.CHANGE24HOUR}
                          </Typography>
                        </Tooltip>
                      </TableCell>
                      <TableCell>
                        <Tooltip title="Percentage Change in 24 hour" arrow>
                          <Typography variant="subtitle1">
                            {priceInfo.CHANGEPCT24HOUR}
                          </Typography>
                        </Tooltip>
                      </TableCell>
                      <TableCell>
                        <Tooltip title="Market Cap." arrow>
                          <Typography variant="subtitle1">
                            {priceInfo.MKTCAP}
                          </Typography>
                        </Tooltip>
                      </TableCell>
                    </TableRow>
                  );
                })}
              </TableBody>
            </Table>
          </TableContainer>
        ) : (
          <ShowError errorMessage={this.props.topCoins.errorMsg} />
        )}
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    topCoins: state.entities.topCoins,
    favourites: [],
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    fetchTopCoins: () => dispatch(fetchTopCoins()),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(HomePage);
