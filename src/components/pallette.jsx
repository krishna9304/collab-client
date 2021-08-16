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
  const [count, setCount] = useState({
    countCircle: 0,
    countRectangle: 0,
    countParalellogram: 0,
    countDiamond: 0,
  });
  const globalState = useSelector((state) => state);
  const node = (id, type, shape) => {
    return {
      id: id,
      width: 140,
      height: 50,
      offsetX: 400,
      offsetY: 400,
      annotations: [
        {
          id: "",
          content: "content",
        },
      ],
      shape: {
        type: type,
        shape: shape,
      },
    };
  };
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
          setCount({ ...count, countCircle: count.countCircle + 1 });
          dispatch(
            addShapes([
              ...globalState.shapes,
              node(`circle-${count.countCircle}`, "Basic", "Ellipse"),
            ])
          );
          console.log(globalState.shapes);
        }}
        className="m-2 p-1 rounded-full justify-center items-center flex hover:bg-gray-300 cursor-pointer h-8"
        id="circle"
      >
        <img className="w-full h-full" src={circle} alt="" srcSet="" />
      </div>
      <div
        onClick={() => {
          setCount({ ...count, countRectangle: count.countRectangle + 1 });
          dispatch(
            addShapes([
              ...globalState.shapes,
              node(`rectangle-${count.countRectangle}`, "Flow", "Process"),
            ])
          );
        }}
        className="m-2 p-1 rounded-full justify-center items-center flex hover:bg-gray-300 cursor-pointer h-8"
        id="rectangle"
      >
        <img className="w-full h-full" src={rectangle} alt="" srcSet="" />
      </div>
      <div
        onClick={() => {
          setCount({
            ...count,
            countParalellogram: count.countParalellogram + 1,
          });
          dispatch(
            addShapes([
              ...globalState.shapes,
              node(
                `parallelogram-${count.countParalellogram}`,
                "Basic",
                "Parallelogram"
              ),
            ])
          );
        }}
        className="m-2 p-1 px-0 rounded-full justify-center items-center flex hover:bg-gray-300 cursor-pointer h-8"
        id="parallelogram"
      >
        <img className="w-full h-full" src={paralellogram} alt="" srcSet="" />
      </div>
      <div
        onClick={() => {
          setCount({ ...count, countDiamond: count.countDiamond + 1 });
          dispatch(
            addShapes([
              ...globalState.shapes,
              node(`diamond-${count.countDiamond}`, "Flow", "Decision"),
            ])
          );
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
