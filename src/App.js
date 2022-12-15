import React, { useState, useEffect } from "react";

import Login from "./components/Login/Login";
import Home from "./components/Home/Home";
import MainHeader from "./components/MainHeader/MainHeader";

/**
 * /// useEffect Hook
 * useEffect is a React hook for side effects.
 * Side effects or effects are the operations that can affect other components and can’t be done during rendering
 *
 * ---We perform a side effect when we need to reach outside of our React components to do something.
 *  Performing a side effect, however, will not give us a predictable result.

   --Think about if we were to request data (like blog posts) from a server that has failed and instead of our post data, 
   gives us a 500 status code response. 
 *
   -Common side effects include:
    -Making a request to an API for data from a backend server 
    -To interact with browser APIs (that is, to use document or window directly)
    -Using unpredictable timing functions like setTimeout or setInterval


    --useEffect  have two arguments  a callBack function and the secound one is  an array dependency 
    
    the procedure of rendering is   first asyncrnos code is rendered , then the UI is rendered , after that  the use effect  function rendered

    Note: if the dependency is empty that means the function runs only once when the program starts
    but  if we put a dependency it renders when the dependency is changed or updated

    Note:If you do not provide the dependencies array at all and only provide a function to useEffect, it will run after every render.then it cause an infinte loop


 * @returns
 */

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const userLoggedValue = localStorage.getItem("isLoggedIn"); //1
  useEffect(() => {
    if (userLoggedValue === "1") setIsLoggedIn(true);
  }, [userLoggedValue]);
  const loginHandler = (email, password) => {
    // We should of course check email and password
    // But it's just a dummy/ demo anyways
    localStorage.setItem("isLoggedIn", "1");
    setIsLoggedIn(true);
  };

  const logoutHandler = () => {
    localStorage.removeItem("isLoggedIn");
    setIsLoggedIn(false);
  };

  return (
    <React.Fragment>
      <MainHeader isAuthenticated={isLoggedIn} onLogout={logoutHandler} />
      <main>
        {!isLoggedIn && <Login onLogin={loginHandler} />}
        {isLoggedIn && <Home onLogout={logoutHandler} />}
      </main>
    </React.Fragment>
  );
}

export default App;
