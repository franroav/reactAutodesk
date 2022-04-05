import React from "react";
import { AppBar, Toolbar, Typography } from "@material-ui/core";
import { createStyles, makeStyles, Theme } from "@material-ui/core/styles";

import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  NavLink,
} from "react-router-dom";

import Inicio from "../Inicio/Inicio";
import Users from "../Users/Users";
import UserDetail from "../Users/user-details/userDetails";

import "./Nav.css";

const useStyles = makeStyles((theme) =>
  createStyles({
    root: {
      flexGrow: 1,
    },
    offset: theme.mixins.toolbar,
    menuButton: {
      marginRight: theme.spacing(2),
    },
    title: {
      flexGrow: 1,
    },
  })
);

function Nav() {
  const classes = useStyles();

  return (
    <>
      <Router>
        <div className={classes.root}>
          <AppBar position="sticky">
            <Toolbar>
              <Typography variant="h6" className={classes.title}>
                Autodesk Challengue
              </Typography>
              <div className="btn-group">
                <Link to="/" className="btn btn-dark">
                  Inicio
                </Link>
                <Link to="/users" className="btn btn-dark">
                  Users
                </Link>
              </div>
            </Toolbar>
          </AppBar>
          <hr />
          <Switch>
            <Route path="/" exact>
              <Inicio />
            </Route>
            <Route path="/users" exact>
              <Users />
            </Route>
            <Route path="/users/:id" exact>
              <UserDetail />
            </Route>
          </Switch>
        </div>
      </Router>
    </>
  );
}

export default Nav;
