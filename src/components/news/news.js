import React, { Component } from "react";
import { connect } from "react-redux";
import { fetchNewsList } from "../../store/reducers/news";
import { BulletList } from "react-content-loader";
import NewsCard from "./newsCard";
import { Grid } from "@material-ui/core";
class News extends Component {
  componentDidMount() {
    this.props.fetchNewsList();
  }
  render() {
    return (
      <div className="container">
        {this.props.news.loading ? (
          <BulletList />
        ) : (
          <Grid container spacing={3}>
            {this.props.news.newsList.map((e) => (
              <Grid key={e.id} item xs={12} sm={6} md={4}>
                <NewsCard newsItem={e} />
              </Grid>
            ))}
          </Grid>
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
