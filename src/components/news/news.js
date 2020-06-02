import React, { Component, Fragment } from "react";
import { connect } from "react-redux";
import { fetchNewsList } from "../../store/reducers/news";
import { BulletList } from "react-content-loader";
import NewsCard from "./newsCard";
import { Grid, LinearProgress, Box } from "@material-ui/core";
import { ShowError } from "../error/error";

class News extends Component {
  componentDidMount() {
    this.props.fetchNewsList();
  }
  render() {
    return (
      <div>
        {this.props.news.loading ? (
          <Fragment>
            <LinearProgress />
            <BulletList />
          </Fragment>
        ) : !this.props.news.hasError ? (
          <Box pt={3} className="news-container">
            <Grid container spacing={3}>
              {this.props.news.newsList.map((e) => (
                <Grid key={e.id} item xs={12} sm={6} md={4}>
                  <NewsCard newsItem={e} />
                </Grid>
              ))}
            </Grid>
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
    news: state.entities.news,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    fetchNewsList: () => dispatch(fetchNewsList()),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(News);
