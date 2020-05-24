//@ts-check
import React, { Component } from "react";
import "./Navigation.css";
import {
  AppBar,
  Toolbar,
  Typography,
  IconButton,
  List,
  ListItem,
  SwipeableDrawer
} from "@material-ui/core";
import { Menu, Home, Add } from "@material-ui/icons";

class Navigation extends Component {
  state = { open: false };

  togggleSidebar = () => this.setState({ open: !this.state.open });

  render() {
    return (
      <div>
        <AppBar position="fixed" style={{ background: "#fff", color: "#000" }}>
          <Toolbar>
            <IconButton
              onClick={this.togggleSidebar}
              className=""
              color="inherit"
              aria-label="Menu"
            >
              <Menu />
            </IconButton>
            <Typography
              variant="subtitle1"
              color="inherit"
              className="crypt-nav-title"
            >
              CrypTrace
            </Typography>
            <IconButton href="/add_coin" color="inherit" aria-label="Menu">
              <Add />
            </IconButton>
          </Toolbar>
        </AppBar>
        <SwipeableDrawer
          open={this.state.open}
          onOpen={this.togggleSidebar}
          onClose={this.togggleSidebar}
        >
          <List style={{ width: 250 }}>
            <ListItem onClick={() => (window.location.href = "/")}>
              <IconButton href="/" aria-label="Home">
                <Home />
              </IconButton>
              Home
            </ListItem>
          </List>
        </SwipeableDrawer>
      </div>
    );
  }
}
export default Navigation;
