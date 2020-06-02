// @ts-check
import React, { Component, Fragment } from "react";
import { BulletList } from "react-content-loader";
import { connect } from "react-redux";
import { fetchCurrentCoin } from "../../store/reducers/coin";
import { fetchChartData } from "../../store/reducers/chart";
import { fetchSocialStats } from "../../store/reducers/socialStats";
import {
  LinearProgress,
  Box,
  Avatar,
  Card,
  CardHeader,
  Typography,
} from "@material-ui/core";
import { Line } from "react-chartjs-2";
class CoinDetail extends Component {
  componentDidMount() {
    const params = new URLSearchParams(this.props.location.search);
    const coinId = params.get("coinId");

    this.props.fetchCurrentCoin(this.props.match.params.symbol);
    this.props.fetchChartData(this.props.match.params.symbol);
    this.props.fetchSocialStats(coinId);
  }

  _renderCoinInfoCard(coin, coinSymbol) {
    return (
      <Box pt={3}>
        <Card style={{ display: "flex", flex: 1 }}>
          <Box display="flex" flex="0 0 120px">
            <CardHeader
              avatar={
                <Avatar src={`https://cryptocompare.com${coin.IMAGEURL}`} />
              }
              title={coinSymbol}
            />
          </Box>
          <Box display="flex" flex="1" alignItems="center" p={"0 8px"}>
            <Box flex="1" textAlign="right" p={0.5}>
              <Typography display="block" variant="caption">
                Price
              </Typography>
              <Typography display="block" variant="caption">
                {coin.PRICE}
              </Typography>
            </Box>
            <Box flex="1" textAlign="right" p={0.5}>
              <Typography display="block" variant="caption">
                MARKET CAP.
              </Typography>
              <Typography display="block" variant="caption">
                {coin.MKTCAP}
              </Typography>
            </Box>
            <Box flex="1" textAlign="right" p={0.5}>
              <Typography display="block" variant="caption">
                HIGH IN 24 HOUR
              </Typography>
              <Typography display="block" variant="caption">
                {coin.HIGH24HOUR}
              </Typography>
            </Box>
            <Box flex="1" textAlign="right" p={0.5}>
              <Typography display="block" variant="caption">
                LOW IN 24 HOUR
              </Typography>
              <Typography display="block" variant="caption">
                {coin.LOW24HOUR}
              </Typography>
            </Box>
            <Box
              flex="1"
              textAlign="right"
              display={{ xs: "none", sm: "none", md: "block" }}
              p={0.5}
            >
              <Typography display="block" variant="caption">
                CHANGE (24 HOUR)
              </Typography>
              <Typography display="block" variant="caption">
                {coin.CHANGE24HOUR}
              </Typography>
              <Typography display="block" variant="caption">
                {coin.CHANGEPCTDAY}%
              </Typography>
            </Box>
          </Box>
        </Card>
      </Box>
    );
  }

  _renderChart(chartData) {
    const data = {
      labels: chartData.labels,
      datasets: [
        {
          label: this.props.coin.coinSymbol,
          fill: true,
          lineTension: 0.1,
          backgroundColor: "rgba(75,192,192,0.4)",
          borderColor: "rgba(75,192,192,1)",
          borderDash: [],
          borderDashOffset: 0.0,
          pointBorderColor: "rgba(75,192,192,1)",
          pointBackgroundColor: "#fff",
          pointBorderWidth: 1,
          pointHoverRadius: 5,
          pointHoverBackgroundColor: "rgba(75,192,192,1)",
          pointHoverBorderColor: "rgba(220,220,220,1)",
          pointHoverBorderWidth: 2,
          pointRadius: 1,
          pointHitRadius: 10,
          data: chartData.prices,
        },
      ],
    };
    const options = {
      responsive: true,
      scales: {
        xAxes: [
          {
            display: true,
            gridLines: {
              display: false,
            },
          },
        ],
        yAxes: [
          {
            type: "linear",
            display: true,
            position: "left",
            id: "y-axis-1",
            gridLines: {
              display: false,
            },
          },
        ],
      },
    };

    return <Line data={data} options={options} />;
  }

  render() {
    return (
      <Box>
        {this.props.coin.loading ? (
          <Fragment>
            <LinearProgress />
            <BulletList />
          </Fragment>
        ) : (
          this._renderCoinInfoCard(
            this.props.coin.coin,
            this.props.coin.coinSymbol
          )
        )}

        {this.props.chart.loading ? (
          <BulletList />
        ) : (
          <Box pt={3}>{this._renderChart(this.props.chart.data)}</Box>
        )}
      </Box>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    coin: state.entities.currentCoin,
    chart: state.entities.chartData,
    socailStats: state.entities.socialStats,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    fetchCurrentCoin: (symbol) => dispatch(fetchCurrentCoin(symbol)),
    fetchChartData: (symbol) => dispatch(fetchChartData(symbol)),
    fetchSocialStats: (coinId) => dispatch(fetchSocialStats(coinId)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(CoinDetail);
