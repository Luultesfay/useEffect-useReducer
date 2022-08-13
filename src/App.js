import React, { useState, useEffect } from "react";
import { AuthContext } from "./store/auth-context";
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


 * 
    // USECONTEXT 
    when we pass a data from parent  to child we need to use props , but some times its very combersome and complex, for example
    if we have  deep nested components and want to send data to the last  child in the chain via prop  then the data should pass 
    every parent of the last child that is called prop drilling , and its  bad practice , the solution for that is to use  contextApi


    context api
    - provided data to every component that is inneed of it, no matter where they are 

    first approch using context.consumer
    ##procedure
    first   import  createContext from react    then  asign variable that hold it  and set value if nedded and export it 
    second   import the variable that hold it in the parent component(probably App component) and  wrap the parent component with the context  <componet.Provider  value={}> 
    the value should be the same as the value of createContext value 


    then  import  the context component to the   component that is in need the data       <component.consumer> <component.consumer>  then theis returned  {(value)=>{return jsx  and replace the prop with the value}}

    Second Approch using  useContext hook
     ##procedure


     Question :What is the difference between usecontext and usecontext hooks in react?

              The function takes context as an argument and returns JSX which renders the data 
              passed via context. In functional components on the other hand,
               useContext hook takes a context object (object returned by React.CreateContext) as an argument 
               and returns the object passed via value prop of Context.Provider.

  
 */

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const userLoggedValue = localStorage.getItem("isLoggedIn"); //1
  useEffect(() => {
    if (userLoggedValue === "1") setIsLoggedIn(true);
  }, []);
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
    <AuthContext.Provider
      value={{ isLoggedIn: isLoggedIn, onLogout: logoutHandler }}
    >
      {/*we need the 'Provider' if the value in the context is need to be changed other wise we can only AuthContext with the value*/}
      <MainHeader />
      <main>
        {!isLoggedIn && <Login onLogin={loginHandler} />}
        {isLoggedIn && <Home onLogout={logoutHandler} />}
      </main>
    </AuthContext.Provider>
  );
}

export default App;
