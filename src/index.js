//@ts-check
import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter } from "react-router-dom";
import { MuiThemeProvider, createMuiTheme } from "@material-ui/core/styles";
// import {fade} from 'material-ui/utils/colorManipulator';
import "./index.css";
import App from "./App";
import registerServiceWorker from "./registerServiceWorker";
import purple from "@material-ui/core/colors/purple";


const theme = createMuiTheme({
  palette: {
    primary: {
      light: purple[300],
      main: purple[500],
      dark: purple[700],
    }
    },
});


const app = (
  <BrowserRouter>
    <MuiThemeProvider theme={theme}>
      <App />
    </MuiThemeProvider>
  </BrowserRouter>
);
ReactDOM.render(app, document.getElementById("root"));
registerServiceWorker();
