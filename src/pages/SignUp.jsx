import React from "react";
import { Link } from "react-router-dom";
import SignUpForm from "../components/signupform";

const SignUpPage = () => {
  return (
    <div className="w-screen h-screen flex flex-col justify-center items-center">
      <Link to="/" className="font-extrabold text-3xl mb-10 text-purple-600">
        Collab.
      </Link>
      <SignUpForm />
    </div>
  );
};

export default SignUpPage;
