import {
  AppBar,
  Avatar,
  Box,
  Button,
  Drawer,
  SwipeableDrawer,
  Toolbar,
  Tooltip,
  Typography,
} from "@material-ui/core";
import CssBaseline from "@material-ui/core/CssBaseline";
import Divider from "@material-ui/core/Divider";
import IconButton from "@material-ui/core/IconButton";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import { makeStyles, useTheme } from "@material-ui/core/styles";
import { AccountBalance, Forum, Home } from "@material-ui/icons";
import AccountBalanceWalletIcon from "@material-ui/icons/AccountBalanceWallet";
import AppsIcon from "@material-ui/icons/Apps";
import ChevronLeftIcon from "@material-ui/icons/ChevronLeft";
import GavelIcon from "@material-ui/icons/Gavel";
import MenuIcon from "@material-ui/icons/Menu";
import clsx from "clsx";
import React from "react";
import { Link, Route, Switch } from "react-router-dom";
import CoinDetail from "./components/CoinDetail/CoinDetail";
import CoinList from "./components/CoinList/CoinList";
import Exchanges from "./components/exchanges/Exchanges";
import HomePage from "./components/HomePage/HomePage";
import Mining from "./components/mining/mining";
import News from "./components/news/news";
import Walltes from "./components/wallets/wallets";

const drawerWidth = 240;

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
  },
  hide: {
    display: "none",
  },
  drawer: {
    width: drawerWidth,
    flexShrink: 0,
    whiteSpace: "nowrap",
  },
  drawerOpen: {
    width: drawerWidth,
    transition: theme.transitions.create("width", {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  drawerClose: {
    transition: theme.transitions.create("width", {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    overflowX: "hidden",
    width: theme.spacing(7) + 1,
    [theme.breakpoints.up("sm")]: {
      width: theme.spacing(9) + 1,
    },
  },
  toolbar: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-evenly",
    padding: theme.spacing(0, 1),
    ...theme.mixins.toolbar,
  },
  brandExpanded: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    width: "100%",
  },
  content: {
    flexGrow: 1,
    backgroundColor: "#eeeff1",
    height: "100vh",
    padding: "0 24px",
    [theme.breakpoints.only("xs")]: {
      marginTop: "56px",
    },
  },
  link: {
    textDecoration: "none",
    color: "initial",
  },
}));

const pages = [
  {
    title: "Home",
    icon: <Home />,
    link: "/",
  },
  {
    title: "Coins List",
    icon: <AppsIcon />,
    link: "allcoins",
  },
  // {
  //   title: "Favourites",
  //   icon: <Star />,
  //   link: "/favourites",
  // },
  {
    title: "News",
    icon: <Forum />,
    link: "/news",
  },
  {
    title: "Exchanges",
    icon: <AccountBalance />,
    link: "/exchanges",
  },
  {
    title: "Wallets",
    icon: <AccountBalanceWalletIcon />,
    link: "/wallets",
  },
  {
    title: "Mining",
    icon: <GavelIcon />,
    link: "/mining",
  },
];

export default function App() {
  const classes = useStyles();
  const theme = useTheme();
  const [open, setOpen] = React.useState(false);
  const [mobileOpen, setMobileOpen] = React.useState(false);

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  const handleMobileDrawerOpen = () => {
    setMobileOpen(true);
  };

  const handleMobileDrawerClose = () => {
    setMobileOpen(false);
  };

  const list = (onclose) => (
    <List>
      {pages.map((p) => {
        return (
          <Link
            onClick={onclose}
            className={classes.link}
            to={p.link}
            key={p.title}
          >
            <Tooltip title={p.title} arrow>
              <ListItem button key={p.title} data-for={p.title}>
                <ListItemIcon>{p.icon}</ListItemIcon>
                <ListItemText primary={p.title} />
              </ListItem>
            </Tooltip>
          </Link>
        );
      })}
    </List>
  );

  return (
    <div className={classes.root}>
      <CssBaseline />

      <Box display={{ xs: "block", sm: "none" }}>
        <SwipeableDrawer
          anchor="left"
          open={mobileOpen}
          onClose={handleMobileDrawerClose}
          onOpen={handleMobileDrawerOpen}
        >
          {list(handleMobileDrawerClose)}
        </SwipeableDrawer>
      </Box>
      <Box display={{ xs: "none", sm: "block" }}>
        <Drawer
          elevation={0}
          variant="permanent"
          className={clsx(classes.drawer, {
            [classes.drawerOpen]: open,
            [classes.drawerClose]: !open,
          })}
          classes={{
            paper: clsx({
              [classes.drawerOpen]: open,
              [classes.drawerClose]: !open,
            }),
          }}
        >
          <div className={classes.toolbar}>
            {!open ? (
              <Avatar
                onClick={handleDrawerOpen}
                src="/icon-192.png"
                aria-label="Cryptrace"
                className="pointer"
              />
            ) : (
              <div className={classes.brandExpanded}>
                <Avatar src="/icon-192.png" aria-label="Cryptrace" />
                <Typography variant="subtitle1">CrypTrace</Typography>
                <IconButton onClick={handleDrawerClose}>
                  <ChevronLeftIcon />
                </IconButton>
              </div>
            )}
          </div>
          <Divider />
          {list(handleDrawerClose)}
        </Drawer>
      </Box>
      <Box display={{ xs: "block", sm: "none" }}>
        <AppBar position="fixed" elevation={0}>
          <Toolbar>
            <IconButton
              edge="start"
              color="inherit"
              aria-label="menu"
              onClick={() => setMobileOpen(!mobileOpen)}
            >
              <MenuIcon />
            </IconButton>
            <Typography variant="h6" style={{ flex: "1", textAlign: "center" }}>
              CrypTrace
            </Typography>
          </Toolbar>
        </AppBar>
      </Box>
      <main className={classes.content}>
        <Switch>
          <Route path="/allcoins" component={CoinList} />
          <Route path="/news" component={News} />
          <Route path="/wallets" component={Walltes} />
          <Route path="/exchanges" component={Exchanges} />
          <Route path="/mining" component={Mining} />
          <Route path="/:symbol" component={CoinDetail} />
          <Route exact path="/" component={HomePage} />
        </Switch>
      </main>
    </div>
  );
}
