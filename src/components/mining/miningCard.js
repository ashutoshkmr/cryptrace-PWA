import {
  Avatar,
  Box,
  Card,
  CardContent,
  CardHeader,
  IconButton,
  Link,
  Tooltip,
  Typography,
  makeStyles,
} from "@material-ui/core";
import LanguageIcon from "@material-ui/icons/Language";
import Rating from "@material-ui/lab/Rating";
import React from "react";

const useStyles = makeStyles((theme) => ({
  label: {
    flex: "0 0 120px",
  },
  "card-header": { paddingBottom: 0 },
}));

export const MiningCard = ({ item }) => {
  const classes = useStyles();
  return (
    <Card>
      <CardHeader
        className={classes["card-header"]}
        avatar={
          <Avatar
            aria-label={item.Name}
            src={`https://cryptocompare.com${item.LogoUrl}`}
          ></Avatar>
        }
        action={
          <IconButton aria-label="settings">
            <Link href={item.AffiliateURL} target="_blank" rel="noopener">
              <LanguageIcon />
            </Link>
          </IconButton>
        }
        title={item.Name}
      />
      <CardContent>
        <Tooltip title={`From ${item.Rating.TotalUsers} users.`}>
          <Box display="flex" alignItems="center" mb={1}>
            <Typography className={classes.label} variant="subtitle2">
              Avg. Rating :
            </Typography>
            <Rating name="disabled" value={item.Rating.Avg} />
          </Box>
        </Tooltip>
        <Box display="flex" mb={1} className="pointer">
          <Typography className={classes.label} variant="subtitle2">
            Average Fee :
          </Typography>
          <Typography variant="subtitle2">{item.AverageFee}</Typography>
        </Box>
        <Box display="flex" mb={1} className="pointer">
          <Typography className={classes.label} variant="subtitle2">
            Coins :
          </Typography>
          <Typography variant="subtitle2">{item.Coins.join(",")}</Typography>
        </Box>
        <Box display="flex" mb={1} className="pointer">
          <Typography className={classes.label} variant="subtitle2">
            Minimum Payout :
          </Typography>
          <Typography variant="subtitle2">{item.MinimumPayout}</Typography>
        </Box>
        <Box display="flex" mb={1} className="pointer">
          <Typography className={classes.label} variant="subtitle2">
            Payment Type :
          </Typography>
          <Typography variant="subtitle2">
            {item.PaymentType.join(",")}
          </Typography>
        </Box>
        <Box display="flex" mb={1} className="pointer">
          <Typography className={classes.label} variant="subtitle2">
            Pool Features :
          </Typography>
          <Typography variant="subtitle2">
            {item.PoolFeatures.join(",")}
          </Typography>
        </Box>
      </CardContent>
    </Card>
  );
};
