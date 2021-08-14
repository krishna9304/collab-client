import axios from "axios";
import React from "react";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { Link, useHistory } from "react-router-dom";
import { BACKEND_URL } from "../env-config";
import { setUser, setAuth } from "../redux/actions/actions";
const SignUpForm = () => {
  const [hide, setHide] = useState(true);
  const [userData, setUserData] = useState({
    username: "",
    firstName: "",
    lastName: "",
    password: "",
    email: "",
  });
  let dispatch = useDispatch();
  let history = useHistory();
  return (
    <div className="flex flex-col max-w-md px-4 py-8 bg-white rounded-lg shadow dark:bg-gray-800 sm:px-6 md:px-8 lg:px-10">
      <div className="self-center mb-2 text-xl font-light text-gray-800 sm:text-2xl dark:text-white">
        Create a new account
      </div>
      <span className="justify-center text-sm text-center text-gray-500 flex-items-center dark:text-gray-400">
        Already have an account ?
        <Link
          to="/signin"
          className="text-sm text-blue-500 underline hover:text-blue-700"
        >
          Sign in
        </Link>
      </span>
      <div className="p-6 mt-8">
        <form action="#">
          <div className="flex flex-col mb-2">
            <div className=" relative ">
              <input
                onChange={(e) => {
                  setUserData({ ...userData, username: e.target.value });
                }}
                type="text"
                id="create-account-username"
                className=" rounded-lg border-transparent flex-1 appearance-none border border-gray-300 w-full py-2 px-4 bg-white text-gray-700 placeholder-gray-400 shadow-sm text-base focus:outline-none focus:ring-2 focus:ring-purple-600 focus:border-transparent"
                name="username"
                placeholder="username"
                required
              />
            </div>
          </div>
          <div className="flex flex-col md:flex-row gap-2 md:gap-4 mb-2">
            <div className=" relative ">
              <input
                onChange={(e) => {
                  setUserData({ ...userData, firstName: e.target.value });
                }}
                type="text"
                id="create-account-first-name"
                className=" rounded-lg border-transparent flex-1 appearance-none border border-gray-300 w-full py-2 px-4 bg-white text-gray-700 placeholder-gray-400 shadow-sm text-base focus:outline-none focus:ring-2 focus:ring-purple-600 focus:border-transparent"
                name="First name"
                placeholder="First name"
                required
              />
            </div>
            <div className=" relative ">
              <input
                onChange={(e) => {
                  setUserData({ ...userData, lastName: e.target.value });
                }}
                type="text"
                id="create-account-last-name"
                className=" rounded-lg border-transparent flex-1 appearance-none border border-gray-300 w-full py-2 px-4 bg-white text-gray-700 placeholder-gray-400 shadow-sm text-base focus:outline-none focus:ring-2 focus:ring-purple-600 focus:border-transparent"
                name="Last name"
                placeholder="Last name"
                required
              />
            </div>
          </div>
          <div className="flex flex-col mb-2">
            <div className="flex relative ">
              <span
                onClick={() => {
                  setHide((h) => !h);
                }}
                className="rounded-l-md inline-flex  items-center px-3 border-t bg-white border-l border-b  border-gray-300 text-gray-500 shadow-sm text-sm"
              >
                <svg
                  width="15"
                  height="15"
                  fill="currentColor"
                  viewBox="0 0 1792 1792"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path d="M1376 768q40 0 68 28t28 68v576q0 40-28 68t-68 28h-960q-40 0-68-28t-28-68v-576q0-40 28-68t68-28h32v-320q0-185 131.5-316.5t316.5-131.5 316.5 131.5 131.5 316.5q0 26-19 45t-45 19h-64q-26 0-45-19t-19-45q0-106-75-181t-181-75-181 75-75 181v320h736z"></path>
                </svg>
              </span>
              <input
                onChange={(e) => {
                  setUserData({ ...userData, password: e.target.value });
                }}
                type={hide ? "password" : "text"}
                id="sign-in-email2"
                className=" rounded-r-lg flex-1 appearance-none border border-gray-300 w-full py-2 px-4 bg-white text-gray-700 placeholder-gray-400 shadow-sm text-base focus:outline-none focus:ring-2 focus:ring-purple-600 focus:border-transparent"
                placeholder="Your password"
                required
              />
            </div>
          </div>
          <div className="flex flex-col mb-2">
            <div className=" relative ">
              <input
                onChange={(e) => {
                  setUserData({ ...userData, email: e.target.value });
                }}
                type="email"
                id="create-account-email"
                className=" rounded-lg border-transparent flex-1 appearance-none border border-gray-300 w-full py-2 px-4 bg-white text-gray-700 placeholder-gray-400 shadow-sm text-base focus:outline-none focus:ring-2 focus:ring-purple-600 focus:border-transparent"
                placeholder="Email"
                required
              />
            </div>
          </div>
          <div className="flex w-full my-4">
            <div
              onClick={(e) => {
                // e.target.disabled = true;
                axios
                  .post(`${BACKEND_URL}/api/v1/auth/signup`, userData)
                  .then((res) => {
                    if (res.data.res) {
                      document.cookie = "jwt=" + res.data.token;
                      dispatch(setUser(res.data.userData));
                      dispatch(setAuth(true));
                      history.push("/");
                    } else {
                      window.alert(res.data.msg);
                    }
                  })
                  .catch(console.log);
              }}
              className="py-2 px-4  bg-purple-600 hover:bg-purple-700 focus:ring-purple-500 focus:ring-offset-purple-200 text-white w-full transition ease-in duration-200 text-center text-base font-semibold shadow-md focus:outline-none focus:ring-2 focus:ring-offset-2  rounded-lg "
            >
              Signup
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default SignUpForm;
