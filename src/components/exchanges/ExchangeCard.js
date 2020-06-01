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
} from "@material-ui/core";
import LanguageIcon from "@material-ui/icons/Language";
import Rating from "@material-ui/lab/Rating";
import React from "react";
export const ExchangeCard = ({ item }) => {
  return (
    <Card>
      <CardHeader
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
        subheader={item.Country}
      />
      <CardContent>
        <Tooltip title={`From ${item.Rating.TotalUsers} users.`}>
          <Box display="flex" alignItems="center" mb={1}>
            <Typography variant="subtitle2">Avg. Rating:</Typography>
            <Rating name="disabled" value={item.Rating.Avg} />
          </Box>
        </Tooltip>
        <Box display="flex" mb={1} className="pointer">
          <Typography variant="subtitle2">Deposit Methods :</Typography>
          <Tooltip title={item.DepositMethods}>
            <Typography variant="subtitle2">
              {item.DepositMethods.substr(0, 64)}
            </Typography>
          </Tooltip>
        </Box>
        <Box display="flex" mb={1} className="pointer">
          <Typography variant="subtitle2">Withdrawl Methods :</Typography>
          <Tooltip title={item.WithdrawalMethods}>
            <Typography variant="subtitle2">
              {item.WithdrawalMethods.substr(0, 64)}
            </Typography>
          </Tooltip>
        </Box>
      </CardContent>
    </Card>
  );
};
