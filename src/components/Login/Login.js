import React, { useEffect, useState, useReducer } from "react";

import Card from "../UI/Card/Card";
import classes from "./Login.module.css";
import Button from "../UI/Button/Button";

const emailReducerFn = (state, action) => {
  if (action.type === "EMAIL-INPUT") {
    return { value: action.val, isValid: action.val.includes("@") };
  }

  if (action.type === "ON_BLUR") {
    return { value: state.val, isValid: state.value.includes("@") };
  }
  return { value: "", isValid: false };
};

const PasswordReducerFn = (state, action) => {
  if (action.type === "PASS_INPUT") {
    return { value: action.val, isValid: action.val.trim().length > 6 };
  }

  if (action.type === " ON_BLUR_PASS") {
    return { value: state.value, isValid: state.value.trim().length > 6 };
  }
  return { value: "", isValid: false };
};
const Login = (props) => {
  const [formIsValid, setFormIsValid] = useState(false);

  const [emailState, emailDispatcherFn] = useReducer(emailReducerFn, {
    value: "",
    isValid: null,
  });
  const [passwordState, passwordDispatcherFn] = useReducer(PasswordReducerFn, {
    value: "",
    isValid: null,
  });

  const { isValid: emailIsValid } = emailState;
  const { isValid: passwordIsValid } = passwordState;

  useEffect(() => {
    const Identifier = setTimeout(() => {
      console.log("cheking Form Validity");
      setFormIsValid(emailIsValid && passwordIsValid);
    }, 500);
    //use effect returns a clean up function
    return () => {
      //this is clean up function  runs before the effect function and clean it up, but  the function in the effect runs first for very first time  after that the clean up function runs before the effect function
      console.log("CLEANUP");
      clearTimeout(Identifier);
    };
  }, [emailIsValid, passwordIsValid]); //when ever one of the dependencies or both changed the the call back function run other with it dosent

  const emailChangeHandler = (event) => {
    emailDispatcherFn({ type: "EMAIL-INPUT", val: event.target.value });
  };

  const passwordChangeHandler = (event) => {
    passwordDispatcherFn({ type: "PASS_INPUT", val: event.target.value });
  };

  const validateEmailHandler = () => {
    emailDispatcherFn({ type: "ON_BLUR" });
  };

  const validatePasswordHandler = () => {
    passwordDispatcherFn({ type: "ON_BLUR_PASS" });
  };

  const submitHandler = (event) => {
    event.preventDefault();

    props.onLogin(emailState.value, passwordState.value);
  };

  return (
    <Card className={classes.login}>
      <form onSubmit={submitHandler}>
        <div
          className={`${classes.control} ${
            emailState.isValid === false ? classes.invalid : ""
          }`}
        >
          <label htmlFor="email">E-Mail</label>
          <input
            type="email"
            id="email"
            value={emailState.value}
            onChange={emailChangeHandler}
            onBlur={validateEmailHandler}
          />
        </div>
        <div
          className={`${classes.control} ${
            passwordState.isValid === false ? classes.invalid : ""
          }`}
        >
          <label htmlFor="password">Password</label>
          <input
            type="password"
            id="password"
            value={passwordState.value}
            onChange={passwordChangeHandler}
            onBlur={validatePasswordHandler}
          />
        </div>
        <div className={classes.actions}>
          <Button type="submit" className={classes.btn} disabled={!formIsValid}>
            Login
          </Button>
        </div>
      </form>
    </Card>
  );
};

export default Login;
