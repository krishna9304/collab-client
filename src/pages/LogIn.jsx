import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { Link, useHistory } from "react-router-dom";
import LoginForm from "../components/loginform";

const LoginPage = () => {
  const auth = useSelector((s) => s.auth);
  let history = useHistory();
  useEffect(() => {
    if (auth) history.push("/");
  });

  return auth ? (
    <div className="w-screen h-screen flex justify-center items-center text-center text-4xl text-purple-600">
      Redirecting...
    </div>
  ) : (
    <div className="w-screen h-screen flex flex-col justify-center items-center">
      <Link to="/" className="font-extrabold text-3xl mb-10 text-purple-600">
        Collab.
      </Link>
      <LoginForm />
    </div>
  );
};

export default LoginPage;
