import { Button, CardActionArea, Link } from "@material-ui/core";
import Card from "@material-ui/core/Card";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";
import { red } from "@material-ui/core/colors";
import { makeStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import React from "react";

const useStyles = makeStyles((theme) => ({
  root: {
    maxWidth: 345,
  },
  media: {
    height: 0,
    paddingTop: "56.25%", // 16:9
  },
  expand: {
    transform: "rotate(0deg)",
    marginLeft: "auto",
    transition: theme.transitions.create("transform", {
      duration: theme.transitions.duration.shortest,
    }),
  },
  expandOpen: {
    transform: "rotate(180deg)",
  },
  avatar: {
    backgroundColor: red[500],
  },
}));

export default function NewsCard({ newsItem }) {
  const classes = useStyles();

  return (
    <Card className={classes.root}>
      <CardActionArea>
        <CardMedia
          className={classes.media}
          image={newsItem.imageurl}
          title={newsItem.title}
        />
        <CardContent>
          <Typography gutterBottom variant="subtitle1" component="p">
            {newsItem.title}
          </Typography>
          <Typography variant="body2" color="textSecondary" component="p">
            {newsItem.body}
          </Typography>
        </CardContent>
      </CardActionArea>
      <CardActions>
        <Button size="small">
          <Link
            href={newsItem.url}
            target="_blank"
            rel="noopener"
            variant="body2"
          >
            Learn More
          </Link>
        </Button>
      </CardActions>
    </Card>
  );
}
