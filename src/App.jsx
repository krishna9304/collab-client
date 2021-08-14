import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import Homepage from "./pages/HomePage";
import LoginPage from "./pages/LogIn";
import SignUpPage from "./pages/SignUp";

function App() {
  let globalState = useSelector((state) => state);
  useEffect(() => {
    console.log(globalState.auth);
  });
  return (
    <div className="select-none">
      <BrowserRouter>
        <Switch>
          <Route path="/signin">
            <LoginPage />
          </Route>
          <Route path="/signup">
            <SignUpPage />
          </Route>
          <Route exact path="/">
            {globalState.auth ? <Homepage /> : <LoginPage />}
          </Route>
        </Switch>
      </BrowserRouter>
    </div>
  );
}

export default App;
