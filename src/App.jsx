import axios from "axios";
import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import { BACKEND_URL } from "./env-config";
import Homepage from "./pages/HomePage";
import LoginPage from "./pages/LogIn";
import SignUpPage from "./pages/SignUp";
import { setAuth, setSocket, setUser } from "./redux/actions/actions";
import socket from "./socket";
import Room from "./pages/room";

export function extractCookies(cookieStr) {
  return cookieStr
    .match(/(^|(?<=, ))[^=;,]+=[^;]+/g)
    .map((cookie) => cookie.split("=").map((v) => v.trim()))
    .filter((v) => v[0].length && v[1].length)
    .reduce((builder, cur) => {
      builder[cur[0]] = cur[1];
      return builder;
    }, {});
}

function App() {
  let [authDone, setAuthDone] = useState(false);
  let dispatch = useDispatch();
  let authUser = () => {
    if (document.cookie !== null && document.cookie !== "") {
      let token = extractCookies(document.cookie).jwt;

      if (token !== undefined || token !== null || token !== "") {
        axios
          .post(`${BACKEND_URL}/api/v1/auth/verifytoken`, {
            token: token,
          })
          .then((res) => {
            try {
              if (res.data.res) {
                document.cookie = "jwt=" + res.data.newToken;
                dispatch(setSocket(socket()));
                dispatch(setAuth(true));
                dispatch(setUser(res.data.userData));
                console.log("token verified");
                setAuthDone(true);
              } else {
                dispatch(setAuth(false));
                dispatch(setUser(null));
                setAuthDone(true);
              }
            } catch (err) {
              dispatch(setAuth(false));
              dispatch(setUser(null));
              setAuthDone(true);
              console.log(err);
            }
          })
          .catch(console.log);
      } else {
        dispatch(setAuth(false));
        dispatch(setUser(null));
        setAuthDone(true);
      }
    } else {
      dispatch(setAuth(false));
      dispatch(setUser(null));
      setAuthDone(true);
    }
  };
  useEffect(() => {
    authUser();
    // eslint-disable-next-line
  }, []);

  if (!authDone) {
    return <h1>Loading...</h1>;
  }

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
            <Homepage />
          </Route>
          <Route exact path="/room/:id">
            <Room />
          </Route>
        </Switch>
      </BrowserRouter>
    </div>
  );
}

export default App;
