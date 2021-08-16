import React from "react";
import { useState } from "react";
import Draggable from "../../utilities/draggable";

const Circle = () => {
  const [size, setSize] = useState(48 * 4);
  const [pos, setPos] = useState({
    x: 0,
    y: 0,
  });
  return (
    <>
      <svg
        className="absolute z-0"
        style={{
          top: pos.y - 4,
          left: pos.x - 4,
          width: size + 10,
          height: size + 10,
        }}
      >
        <circle stroke="black" cx={size / 2 + 4} cy={4} r={4} />
        <circle stroke="black" cx={size / 2 + 4} cy={size + 4} r={4} />
        <circle stroke="black" cx={4} cy={size / 2 + 4} r={4} />
        <circle stroke="black" cx={size + 4} cy={size / 2 + 4} r={4} />
      </svg>
      <Draggable
        className="z-10"
        onPosChange={(p) => {
          setPos(p);
        }}
      >
        <div
          contentEditable
          onChange={console.log}
          style={{
            width: size + "px",
            height: size + "px",
          }}
          className={`rounded-full bg-white cursor-move border-2 border-blue-900`}
        />
      </Draggable>
    </>
  );
};

export default Circle;
