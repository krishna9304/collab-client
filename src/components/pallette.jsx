import React, { useState } from "react";
import { useEffect } from "react";
import circle from "./icons/circle.png";
import rectangle from "./icons/rectangular-shape-outline.png";
import diamond from "./icons/diamond.png";
import paralellogram from "./icons/parallelogram.png";
import { useDispatch, useSelector } from "react-redux";
import { addConnectors, addShapes } from "../redux/actions/actions";
import connect from "./icons/jack-connector.png";

class node {
  constructor(id, type, shape) {
    this.id = id;
    this.width = 140;
    this.height = 50;
    this.offsetX = 400;
    this.offsetY = 400;
    this.annotations = [
      {
        id: "",
        content: "id: " + id,
      },
    ];
    this.shape = {
      type: type,
      shape: shape,
    };
  }
}

const Pallete = () => {
  const [hidden, setHidden] = useState(true);
  const connector = (id, sourceID, targetID) => {
    return {
      // Name of the connector
      id: id,
      style: {
        strokeColor: "#6BA5D7",
        fill: "#6BA5D7",
        strokeWidth: 2,
      },
      targetDecorator: {
        style: {
          fill: "#6BA5D7",
          strokeColor: "#6BA5D7",
        },
      },
      // ID of the source and target nodes
      sourceID: sourceID,
      targetID: targetID,
      type: "Orthogonal",
    };
  };

  let dispatch = useDispatch();
  const [count, setCount] = useState({
    countCircle: 0,
    countRectangle: 0,
    countParalellogram: 0,
    countDiamond: 0,
    countConnector: 0,
  });
  const globalState = useSelector((state) => state);
  useEffect(() => {
    setCount({ ...count, countConnector: count.countConnector + 1 });
    dispatch(
      addConnectors([
        ...globalState.connectors,
        connector(`connector-${count.countConnector}`, "", ""),
      ])
    );
  }, [globalState.shapes]);
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
              new node(`c-${count.countCircle}`, "Basic", "Ellipse"),
            ])
          );
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
              new node(`r-${count.countRectangle}`, "Flow", "Process"),
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
              new node(
                `p-${count.countParalellogram}`,
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
              new node(`d-${count.countDiamond}`, "Flow", "Decision"),
            ])
          );
        }}
        className="m-2 p-0.5 rounded-full justify-center items-center flex hover:bg-gray-300 cursor-pointer h-8"
        id="diamond"
      >
        <img className="w-full h-full" src={diamond} alt="" srcSet="" />
      </div>
      <div
        onClick={() => {
          let sourceID = window.prompt("Connect From: ");
          let targetID = window.prompt("Connect To: ");
          setCount({ ...count, countConnector: count.countConnector + 1 });
          dispatch(
            addConnectors([
              ...globalState.connectors,
              connector(
                `connector-${count.countConnector}`,
                sourceID,
                targetID
              ),
            ])
          );
        }}
        className="m-2 p-0.5 rounded-full justify-center items-center flex hover:bg-gray-300 cursor-pointer h-8"
        id="connector"
      >
        <img className="w-full h-full" src={connect} alt="" srcSet="" />
      </div>
    </div>
  );
};

export default Pallete;
