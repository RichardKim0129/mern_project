import React, { useState, useEffect } from "react";
import { AppBar, Button, Toolbar, Typography, Avatar } from "@material-ui/core";

import { Link } from "react-router-dom";

import journalieLogo from "../../images/journalieLogo.png";
import journalieText from "../../images/journalieText.png";
import useStyles from "./styles";

import { useHistory, useLocation } from "react-router-dom";
import { useDispatch } from "react-redux";
import { LOGOUT } from "../../constants/actionTypes";

import decode from 'jwt-decode'

const Navbar = () => {
  const classes = useStyles();
  const [user, setUser] = useState(JSON.parse(localStorage.getItem("profile")));
  const dispatch = useDispatch();
  const history = useHistory();
  const location = useLocation();

  const logout = () => {
    dispatch({ type: LOGOUT });

    history.push("/");

    setUser(null);
  };

  // Renavigate automatically after login
  useEffect(() => {
    // Check for token
    const token = user?.token;

    // Checking of the token is expired
    // Check if token even exists
    if (token) {
      const decodedToken = decode(token);

      if (decodedToken.exp * 1000 < new Date().getTime()) {
        logout();
      }
    }

    setUser(JSON.parse(localStorage.getItem("profile")));
  }, [location]);

  return (
    <AppBar className={classes.appBar} position="static" color="inherit">
      <Link to="/" className={classes.brandContainer}>
        <img src={journalieText} alt="logo text" height="45" />
        <img className={classes.image} src={journalieLogo} alt="journalie" height="40" />
      </Link>
      <Toolbar className={classes.toolbar}>
        {user ? (
          <div className={classes.profile}>
            <Avatar className={classes.purple} alt={user.result.name} src={user.result.imageUrl}>
              {user.result.name.charAt(0)}
            </Avatar>
            <Typography className={classes.userName} variant="h6">
              {user.result.name}
            </Typography>
            <Button variant="contained" className={classes.logout} color="secondary" onClick={logout}>
              Logout
            </Button>
          </div>
        ) : (
          <Button component={Link} to="/auth" variant="contained" color="primary">
            Sign In
          </Button>
        )}
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;
