import React, { useEffect, useState } from "react";
import {
  Route,
  Link,
  Redirect,
  Switch,
  useHistory,
  withRouter,
} from "react-router-dom";
import {
  Container,
  AppBar,
  Typography,
  Toolbar,
  IconButton,
} from "@material-ui/core";
import MapIcon from "@material-ui/icons/Map";
import { Home } from "../pages";

export default function Layout() {
  return (
    <React.Fragment>
      <AppBar position="static">
        <Toolbar>
          <IconButton edge="start" color="inherit" aria-label="logo">
            <MapIcon />
          </IconButton>

          <Typography variant="h5">Cycloud</Typography>
        </Toolbar>
      </AppBar>
      <Container maxWidth="false">
        <Route exact path="/" component={Home} />
      </Container>
    </React.Fragment>
  );
}
