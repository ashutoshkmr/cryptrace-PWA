// @ts-check
import React, { Component } from "react";
import ReactDOM from "react-dom";
import Chart from "chart.js";
import moment from "moment";
import { Link } from "react-router-dom";
import {
  Card,
  CardHeader,
  CardContent,
  Avatar,
  Typography,
  Divider,
  IconButton,
  Collapse,
  CircularProgress,
  Button
} from "@material-ui/core";

import { withStyles } from "@material-ui/core/styles";
import classnames from "classnames";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";

const styles = theme => ({
  card: {
    maxWidth: 400
  },
  media: {
    height: 0,
    paddingTop: "56.25%" // 16:9
  },
  actions: {
    display: "flex"
  },
  expand: {
    transform: "rotate(0deg)",
    transition: theme.transitions.create("transform", {
      duration: theme.transitions.duration.shortest
    }),
    marginLeft: "auto"
  },
  expandOpen: {
    transform: "rotate(180deg)"
  }
});

class Coin extends Component {
  state = {
    coinData: this.props.data,
    loading: true,
    expanded: false,
    price: "",
    change: "",
  };

  handleExpandClick = () => {
    fetch(
      `https://min-api.cryptocompare.com/data/histominute?fsym=${
        this.props.data.Symbol
      }&tsym=USD&limit=30&aggregate=5&e=CCCAGG`
    )
      .then(response => response.json())
      .then(response => {
        this.setState({
          Data: response.Data,
          coinValue: response.Data[response.Data.length - 1],
          loading: false
        });
      })
      .then(() => {
        this.drawChart();
      })
      .catch(err => console.log(err));
    this.setState({ expanded: !this.state.expanded });
  };

  componentDidMount() {
    fetch(`https://www.cryptonator.com/api/full/${this.props.data.Symbol}-usd`)
      .then(data => data.json())
      .then(data => data["ticker"])
      .then(data => {
        this.setState({
          markets: data.markets,
          price: "$" + parseFloat(data.price).toFixed(4),
          change:
            (data.change[0] === "-" ? "" : "+") +
            parseFloat(data.change).toFixed(2) +
            "%"
        });
      });
  }
  drawChart = () => {
    let time = [],
      price = [];
    this.state.Data.map(e => {
      time.push(moment(parseInt(e.time, 10) * 1000).format("LLL"));
      price.push(e.close);
      return true;
    });
    let context = ReactDOM.findDOMNode(this)
      // @ts-ignore
      .getElementsByTagName("canvas")[0]
      .getContext("2d");
    new Chart(context, {
      type: "line",

      data: {
        labels: time,
        datasets: [
          {
            fill: false,
            borderColor: "purple",
            pointBorderColor: "purple",
            pointBackgroundColor: "#fff",
            data: price
          }
        ]
      },
      options: {
        legend: {
          display: false
        },
        animation: {
          duration: 0
        },
        scales: {
          yAxes: [
            {
              display: false
            }
          ],
          xAxes: [
            {
              display: false
            }
          ]
        }
      }
    });
    this.setState({historyPrice : price, historyTime:time})
  };
  render() {
    const { classes } = this.props;
    return (
      <Card style={{ minHeight: "280px !important" }}>
          <CardHeader
            avatar={
              <Avatar
                src={`https://cryptocompare.com${this.props.data.ImageUrl}`}
                aria-label={this.props.data.Symbol}
                className=""
              />
            }
          title={this.props.data.CoinName + "(" + this.props.data.Symbol + ")"}
          subheader={this.state.price + " \t" + this.state.change}
          action={
            <IconButton
              className={classnames(classes.expand, {
                [classes.expandOpen]: this.state.expanded
              })}
              onClick={this.handleExpandClick}
              aria-expanded={this.state.expanded}
              aria-label="Show more"
            >
              <ExpandMoreIcon />
            </IconButton>
          }
        />
        <Collapse in={this.state.expanded} timeout="auto" unmountOnExit>
          {this.state.loading ? (
            <div style={{ textAlign: "center", marginBottom: "10px" }}>
              <CircularProgress color="primary" />
            </div>
          ) : (
            <CardContent style={{ display: "flex" }}>
              <div style={{ width: "60%" }}>
                <canvas />
              </div>
              <div style={{ width: "40%" }}>
                {this.state.coinValue ? (
                  <div>
                    <Typography gutterBottom align="right">
                      Open :${this.state.coinValue.open}
                    </Typography>
                    <Divider />
                    <Typography gutterBottom align="right">
                      Close :${this.state.coinValue.close}
                    </Typography>
                    <Divider />
                    <Typography gutterBottom align="right">
                      High :${this.state.coinValue.high}
                    </Typography>
                    <Divider />
                    <Typography gutterBottom align="right">
                      Low :${this.state.coinValue.low}
                    </Typography>
                    <Divider />
                    <Typography gutterBottom align="right">
                      Volume :{this.state.coinValue.volumeto}
                    </Typography>
                    <Divider />
                    <div style={{ textAlign: "right", margin: "10px 0 0 0" }}>
                      <Button
                        // @ts-ignore
                        variant="raised"
                        color="default"
                        component={Link}
                        to={{
                          pathname: "/coin_detail",
                          state: this.state
                        }}
                      >
                        <Typography>More</Typography>
                      </Button>
                    </div>
                  </div>
                ) : null}
              </div>
            </CardContent>
          )}
        </Collapse>
      </Card>
    );
  }
}
export default withStyles(styles)(Coin);
