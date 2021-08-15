import React from "react";
import Draggable from "../../utilities/draggable";
const Circle = () => {
  return (
    <Draggable>
      <div className="w-48 h-48 rounded-full shadow-lg bg-white cursor-move border-2 border-blue-900"></div>
    </Draggable>
  );
};

export default Circle;
