import React, { useState } from "react";
import { useEffect } from "react";
import circle from "./icons/circle.png";
import rectangle from "./icons/rectangular-shape-outline.png";
import diamond from "./icons/diamond.png";
import paralellogram from "./icons/parallelogram.png";
import { useDispatch, useSelector } from "react-redux";
import { addShapes } from "../redux/actions/actions";

const Pallete = () => {
  const [hidden, setHidden] = useState(true);
  let dispatch = useDispatch();
  const globalState = useSelector((state) => state);
  useEffect(() => {
    let prev;
    if (typeof window.onmousemove == "function") {
      prev = window.onmousemove;
    } else {
      prev = (e) => {};
    }
    window.onmousemove = (e) => {
      prev(e);
      setHidden(e.clientX > 50);
    };
  }, []);
  return (
    <div
      className={`fixed top-1/3 ${
        hidden ? "-left-1/2" : "left-2"
      } w-12 h-62 rounded-lg bg-white shadow-lg duration-300`}
    >
      <div
        onClick={() => {
          let shape = { x: 0, y: 0, type: "circle" };
          console.log(globalState.shapes);
          dispatch(addShapes([...globalState.shapes, shape]));
        }}
        className="m-2 p-1 rounded-full justify-center items-center flex hover:bg-gray-300 cursor-pointer h-8"
        id="circle"
      >
        <img className="w-full h-full" src={circle} alt="" srcSet="" />
      </div>
      <div
        onClick={() => {
          let shape = { x: 0, y: 0, type: "rectangle" };
          dispatch(addShapes([...globalState.shapes, shape]));
        }}
        className="m-2 p-1 rounded-full justify-center items-center flex hover:bg-gray-300 cursor-pointer h-8"
        id="rectangle"
      >
        <img className="w-full h-full" src={rectangle} alt="" srcSet="" />
      </div>
      <div
        onClick={() => {
          let shape = { x: 0, y: 0, type: "paralellogram" };
          dispatch(addShapes([...globalState.shapes, shape]));
        }}
        className="m-2 p-1 px-0 rounded-full justify-center items-center flex hover:bg-gray-300 cursor-pointer h-8"
        id="paralellogram"
      >
        <img className="w-full h-full" src={paralellogram} alt="" srcSet="" />
      </div>
      <div
        onClick={() => {
          let shape = { x: 0, y: 0, type: "diamond" };
          dispatch(addShapes([...globalState.shapes, shape]));
        }}
        className="m-2 p-0.5 rounded-full justify-center items-center flex hover:bg-gray-300 cursor-pointer h-8"
        id="diamond"
      >
        <img className="w-full h-full" src={diamond} alt="" srcSet="" />
      </div>
    </div>
  );
};

export default Pallete;
