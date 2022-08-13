//using react Context Api using CONSUMER

/*
import React from "react";
import { AuthContext } from "../../store/auth-context";
import classes from "./Navigation.module.css";

const Navigation = (props) => {
  //the the AuthContext.Consumer  returns a function   {()=>{return jsx}} //ctx represent to the value  and  apdate jsx
  return (
    <AuthContext.Consumer>
      {(ctx) => {
        return (
          <nav className={classes.nav}>
            <ul>
              {ctx.isLoggedIn && (
                <li>
                  <a href="/">Users</a>
                </li>
              )}
              {ctx.isLoggedIn && (
                <li>
                  <a href="/">Admin</a>
                </li>
              )}
              {ctx.isLoggedIn && (
                <li>
                  <button onClick={props.onLogout}>Logout</button>
                </li>
              )}
            </ul>
          </nav>
        );
      }}
    </AuthContext.Consumer>
  );
};
export default Navigation;
*/

//or  the best Using useContext Hook

import React from "react";
import { AuthContext } from "../../store/auth-context";
import classes from "./Navigation.module.css";
import { useContext } from "react";

const Navigation = () => {
  const ctx = useContext(AuthContext);

  return (
    <nav className={classes.nav}>
      <ul>
        {ctx.isLoggedIn && (
          <li>
            <a href="/">Users</a>
          </li>
        )}
        {ctx.isLoggedIn && (
          <li>
            <a href="/">Admin</a>
          </li>
        )}
        {ctx.isLoggedIn && (
          <li>
            <button onClick={ctx.onLogout}>Logout</button>
          </li>
        )}
      </ul>
    </nav>
  );
};

export default Navigation;
