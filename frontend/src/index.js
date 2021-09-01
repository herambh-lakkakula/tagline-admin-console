import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter, Route, Switch, Redirect } from "react-router-dom";
import { Provider } from "react-redux";
import store from "./store";
import theme from "./Theme.js";
import { ThemeProvider } from "@material-ui/core";
// core components
import Admin from "layouts/Admin.js";

import "assets/css/material-dashboard-react.css?v=1.10.0";

ReactDOM.render(
  <Provider store={store}>
    <ThemeProvider theme={theme}>
      <BrowserRouter>
        <Switch>
           <Redirect from="/" to="/admin/dashboard" exact />
          <Route path="/admin" component={Admin} />
          <Route path="/admin/users" component={Admin} />
          <Redirect from="/admin/users" to="/admin/users" />
        </Switch>
      </BrowserRouter>
    </ThemeProvider>
  </Provider>,
  document.getElementById("root")
);
