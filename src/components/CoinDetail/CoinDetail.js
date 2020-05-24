// @ts-check
import Avatar from "@material-ui/core/Avatar";
import Button from "@material-ui/core/Button";
import Card from "@material-ui/core/Card";
import CardHeader from "@material-ui/core/CardHeader/CardHeader";
import FormControlLabel from "@material-ui/core/FormControlLabel/FormControlLabel";
import Grid from "@material-ui/core/Grid/Grid";
import Menu from "@material-ui/core/Menu";
import MenuItem from "@material-ui/core/MenuItem";
import Switch from "@material-ui/core/Switch";
import Typography from "@material-ui/core/Typography";
import ShowChart from "@material-ui/icons/ShowChart";
import Chart from "chart.js";
import moment from "moment";
import React, { Component } from "react";
import ReactDOM from "react-dom";
import * as io from "socket.io-client";
import CCC from "../../helpers/socketParse";
import { ma } from "../../moving-averages";
let chart;

class CoinDetail extends Component {
  state = {
    p: this.props.location.state,
    Symbol: this.props.location.state.coinData.Symbol,
    change: "",
    price: "",
    anchorEl: null,
    MA: false,
    BB: false,
    AG: false,
    RSI: false,
    markets: this.props.location.state.markets,
  };

  liveData = {
    price: this.props.location.state.historyPrice,
    time: this.props.location.state.historyTime,
  };

  socket = io.connect("https://streamer.cryptocompare.com/");

  dataUnpack(data) {
    let to = data["TOSYMBOL"];
    let from = data["FROMSYMBOL"];
    let tsym = CCC.STATIC.CURRENCY.getSymbol(to);
    let pair = from + to;
    let LivePrice = {};
    if (!LivePrice.hasOwnProperty(pair)) {
      LivePrice[pair] = {};
    }

    for (var key in data) {
      LivePrice[pair][key] = data[key];
    }

    if (LivePrice[pair]["LASTTRADEID"]) {
      LivePrice[pair]["LASTTRADEID"] = parseInt(
        LivePrice[pair]["LASTTRADEID"],
        10
      ).toFixed(0);
    }
    LivePrice[pair]["CHANGE24HOUR"] = CCC.convertValueToDisplay(
      tsym,
      LivePrice[pair]["PRICE"] - LivePrice[pair]["OPEN24HOUR"]
    );
    LivePrice[pair]["CHANGE24HOURPCT"] =
      (
        ((LivePrice[pair]["PRICE"] - LivePrice[pair]["OPEN24HOUR"]) /
          LivePrice[pair]["OPEN24HOUR"]) *
        100
      ).toFixed(2) + "%";
    this.updateData(LivePrice[pair]);
  }
  updateData = (data) => {
    if (data.PRICE && chart) {
      if (this.liveData.price.length > 30) {
        this.liveData.price.shift();
        this.liveData.time.shift();
      }
      this.liveData.price.push(data.PRICE);
      this.liveData.time.push(moment(data.LASTUPDATE * 1000).format("LLL"));

      chart.data.datasets.forEach((element) => {
        element.data = this.liveData.price;
      });
      chart.data.labels = this.liveData.time;
      this.drawMa();
      this.drawBollinger();
      chart.update();
    }
  };
  drawMa() {
    if (this.state.MA) {
      let m = ma(this.liveData.price, 5);
      this.liveData["ma"] = m;
      chart.data.datasets.push({
        fill: false,
        borderColor: "blue",
        pointBorderColor: "blue",
        pointBackgroundColor: "#fff",
        data: this.liveData.ma,
      });
    }
  }
  drawBollinger() {
    if (this.state.BB) {
      let mean = Math.floor(
        this.liveData.price.reduce((a, b) => a + b) / this.liveData.price.length
      );
      let Squared_sum_diff_from_mean = this.liveData.price
        .map((e) => Math.pow(mean - e, 2))
        .reduce((a, b) => a + b);
      let deviation = Math.sqrt(
        Squared_sum_diff_from_mean / (this.liveData.price.length - 1)
      );
      let upper_band = this.liveData.price.map((e) => e + 2 * deviation);
      let lower_band = this.liveData.price.map((e) => e - 2 * deviation);
      chart.data.datasets.push({
        fill: false,
        borderColor: "green",
        pointBorderColor: "green",
        pointBackgroundColor: "#fff",
        data: upper_band,
      });
      chart.data.datasets.push({
        fill: false,
        borderColor: "red",
        pointBorderColor: "red",
        pointBackgroundColor: "#fff",
        data: lower_band,
      });
    }
  }
  emitSubscription() {
    let subs = "5~CCCAGG~" + this.state.Symbol + "~USD";
    this.socket.emit("SubAdd", {
      subs: [subs],
    });
  }
  handleClick = (event) => {
    this.setState({ anchorEl: event.currentTarget });
  };
  handleChange = (name) => (event) => {
    this.setState({ [name]: event.target.checked });
    if (this.state.MA) {
      this.drawMa();
      chart.update();
    }
    if (this.state.BB) {
      this.drawBollinger();
    }
    chart.update();
  };

  handleClose = () => {
    this.setState({ anchorEl: null });
  };
  drawChart = () => {
    let context = ReactDOM.findDOMNode(this)
      // @ts-ignore
      .getElementsByTagName("canvas")[0]
      .getContext("2d");
    let Linechart = new Chart(context, {
      type: "line",
      data: {
        labels: this.liveData.time,
        datasets: [
          {
            fill: false,
            borderColor: "purple",
            pointBorderColor: "purple",
            pointBackgroundColor: "#fff",
            data: this.liveData.price,
          },
        ],
      },
      options: {
        legend: {
          display: false,
        },
        animation: {
          duration: 0,
        },
        scales: {
          yAxes: [
            {
              display: false,
            },
          ],
          xAxes: [
            {
              display: false,
            },
          ],
        },
      },
    });
    chart = Linechart;
  };
  componentDidMount() {
    this.socket.on("m", (message) => {
      let res = {};
      let messageType = message.substring(0, message.indexOf("~"));

      if (messageType === CCC.STATIC.TYPE.CURRENTAGG) {
        res = CCC.CURRENT.unpack(message);
        this.dataUnpack(res);
      }
    });
    this.drawChart();
    this.emitSubscription();
  }
  componentWillUnmount() {
    // @ts-ignore
    this.socket.disconnect();
  }
  render() {
    const { anchorEl } = this.state;
    let c = this.state.p.change[0] === "-" ? "red" : "green";
    return (
      <div>
        <Card>
          <div style={{ display: "flex" }}>
            <div style={{ width: "50%" }}>
              <CardHeader
                avatar={
                  <Avatar
                    src={`https://cryptocompare.com${this.state.p.coinData.ImageUrl}`}
                    aria-label={this.state.p.coinData.CoinName}
                  />
                }
                title={this.state.p.coinData.CoinName}
              />
            </div>
            <div style={{ width: "50%" }} className="MuiCardHeader-root-103">
              <div style={{ display: "flex", width: "100%" }}>
                <Typography style={{ textAlign: "right", width: "50%" }}>
                  {this.state.p.price}
                </Typography>
                <Typography
                  style={{ textAlign: "right", width: "50%", color: c }}
                >
                  {this.state.p.change}
                </Typography>
              </div>
            </div>
          </div>
        </Card>

        <Card>
          <canvas />
        </Card>
        <Button
          variant="fab"
          color="primary"
          style={{
            position: "fixed",
            bottom: "10px",
            right: "5px",
          }}
          aria-label="Graphs"
          id="simple-menu"
          aria-owns={anchorEl ? "simple-menu" : null}
          aria-haspopup="true"
          onClick={this.handleClick}
        >
          <ShowChart />
        </Button>
        <Menu
          id="simple-menu"
          anchorEl={anchorEl}
          open={Boolean(anchorEl)}
          onClose={this.handleClose}
        >
          <MenuItem>
            <FormControlLabel
              control={
                <Switch
                  checked={this.state.MA}
                  onChange={this.handleChange("MA")}
                  value="Moving Average"
                  color="primary"
                />
              }
              label="Moving Average"
            />
          </MenuItem>
          <MenuItem>
            {" "}
            <FormControlLabel
              control={
                <Switch
                  checked={this.state.BB}
                  onChange={this.handleChange("BB")}
                  value="Bollinger Bands"
                  color="primary"
                />
              }
              label="Bollinger Bands"
            />
          </MenuItem>
          <MenuItem>
            {" "}
            <FormControlLabel
              control={
                <Switch
                  checked={this.state.AG}
                  onChange={this.handleChange("AG")}
                  value="Alligator"
                  color="primary"
                />
              }
              label="Alligator"
            />
          </MenuItem>
          <MenuItem>
            {" "}
            <FormControlLabel
              control={
                <Switch
                  checked={this.state.RSI}
                  onChange={this.handleChange("RSI")}
                  value="RSI"
                  color="primary"
                />
              }
              label="RSI"
            />
          </MenuItem>
        </Menu>
        {/* <Divider /> */}
        <Card style={{ marginTop: "25px" }}>
          <Typography
            style={{ border: "none" }}
            align="center"
            gutterBottom={true}
            variant="headline"
          >
            Markets
          </Typography>

          <Grid container spacing={24}>
            {this.state.markets.map((market, index) => {
              return (
                <Grid item xs={12} sm={3} key={index}>
                  <Card
                    style={{
                      display: "flex",
                      height: "50px",
                      alignItems: "center",
                      padding: "10px",
                    }}
                  >
                    <Typography style={{ minWidth: "50%" }}>
                      {market.market}
                    </Typography>
                    <Typography style={{ textAlign: "right", minWidth: "50%" }}>
                      ${parseFloat(market.price).toFixed(2)}
                    </Typography>
                  </Card>
                </Grid>
              );
            })}
          </Grid>
        </Card>
      </div>
    );
  }
}
export default CoinDetail;
