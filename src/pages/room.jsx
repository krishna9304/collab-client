import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { useHistory, useParams } from "react-router-dom";
import Pallete from "../components/pallette";
import Circle from "../components/shapes/circle";
import Diamond from "../components/shapes/diamond";
import Paralellogram from "../components/shapes/paralellogram";
import Rectangle from "../components/shapes/rectangle";
const Room = () => {
  const auth = useSelector((s) => s.auth);
  const params = useParams();
  // eslint-disable-next-line
  const id = params.id;
  const history = useHistory();
  let globalState = useSelector((state) => state);
  useEffect(() => {
    console.log(globalState);
  }, [globalState]);
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
      <div className="h-full w-2/3 shadow-inner flex flex-col justify-center bg-gray-200">
        <Pallete />
        {globalState.shapes.map((item, i) => {
          if (item.type === "circle") return <Circle key={i} />;
          if (item.type === "rectangle") return <Rectangle key={i} />;
          if (item.type === "paralellogram") return <Paralellogram key={i} />;
          if (item.type === "diamond") return <Diamond key={i} />;
          return null;
        })}
      </div>
      <div className="h-full w-1/3 bg-purple-600 flex flex-wrap"></div>
    </div>
  );
};

export default Room;
