import React, { useState, useReducer, useEffect } from "react";

import Card from "../UI/Card/Card";
import classes from "./Login.module.css";
import Button from "../UI/Button/Button";

const emailReducerFn = (state, action) => {
  if (action.type === "USER_EMAIL") {
    return { value: action.val, isValid: action.val.includes("@") };
  }
  if (action.type === "USER_BLUR") {
    return { value: state.value, isValid: state.value.includes("@") };
  }

  return { value: "", isValid: false };
};
const passwordReducerFn = (state, action) => {
  if (action.type === "USER_EMAIL") {
    return { value: action.val, isValid: action.val.trim().length > 6 };
  }
  if (action.type === "USER_BLUR") {
    return { value: state.value, isValid: state.value.trim().length > 6 };
  }

  return { value: "", isValid: false };
};
const Login = (props) => {
  // const [enteredEmail, setEnteredEmail] = useState("");
  // const [emailIsValid, setEmailIsValid] = useState();
  // const [enteredPassword, setEnteredPassword] = useState("");
  // const [passwordIsValid, setPasswordIsValid] = useState();
  const [formIsValid, setFormIsValid] = useState(false);

  const [emailState, dispatchEmail] = useReducer(emailReducerFn, {
    value: "",
    isValid: null,
  });
  const [passwordState, dispatchPassword] = useReducer(passwordReducerFn, {
    value: "",
    isValid: null,
  });

  const { isValid: emailisValied } = emailState;
  const { isValid: passwordisValied } = passwordState;
  // useEffect with dipendences
  // we  are introduce concept of debaouncing , with the clean up function
  // we set  timer for the user Input to finsh or pose typing with setTimeOUt then
  // we return clean up function to clean the previous timer and set up new timer by clearTimeout
  // best example is when we send http request to fetch data  clean up function help us from sending multiple request it  a time
  useEffect(() => {
    const Identifier = setTimeout(() => {
      console.log("cheking Form Validity");
      setFormIsValid(emailisValied && passwordisValied);
    }, 500);
    return () => {
      console.log("CLEANUP");
      clearTimeout(Identifier);
    };
  }, [emailisValied, passwordisValied]); //when ever one of the dependencies or both changed the the call back function run other with it dosent

  const emailChangeHandler = (event) => {
    dispatchEmail({ type: "USER_EMAIL", val: event.target.value });
    //setFormIsValid(event.target.value.includes("@") && passwordState.isValid);
  };

  const passwordChangeHandler = (event) => {
    dispatchPassword({ type: "USER_EMAIL", val: event.target.value });
    // setFormIsValid(emailState.isValid && event.target.value.trim().length > 6);
  };

  const validateEmailHandler = () => {
    dispatchEmail({ type: "USER_BLUR" });
  };

  const validatePasswordHandler = () => {
    dispatchPassword({ type: "USER_BLUR" });
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
