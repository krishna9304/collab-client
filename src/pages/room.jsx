import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { useHistory, useParams } from "react-router-dom";
const Room = () => {
  const auth = useSelector((s) => s.auth);
  const params = useParams();
  const id = params.id;
  const history = useHistory();
  useEffect(() => {
    if (!auth) {
      history.push("/signin");
    }
  }, [auth, history]);
  return !auth ? (
    <div className="w-screen h-screen flex justify-center items-center text-center text-4xl text-purple-600">
      Redirecting...
    </div>
  ) : (
    <div className="flex h-screen w-screen">
      <div className="h-full w-2/3 flex justify-center items-center">
        Hey, welcome to room&nbsp;
        <span className="text-lg text-purple-600 font-light">{id}</span>
      </div>
      <div className="h-full w-1/3 bg-purple-600 flex flex-wrap"></div>
    </div>
  );
};

export default Room;
